<template>
    <div id="app container">
        <div v-if="!contract.address" class="overlay">
            <div class="white"></div>
            <button class="btn btn-lg order text-uppercase" @click.prevent="order">
                <i v-if="!transaction_in_progress" class="fa fa-shopping-cart"></i>
                <i v-else class="fa fa-spinner fa-spin"></i>
                Place order</button>
        </div>
        <div v-if="ready_to_accept()" class="overlay">
            <div class="white"></div>
            <button class="btn btn-lg order text-uppercase" @click.prevent="accept">
                <i v-if="!transaction_in_progress" class="fa fa-check"></i>
                <i v-else class="fa fa-spinner fa-spin"></i>
                Accept delivery</button>
        </div>
        <div class="row">
            <div class="col headerL"><img class="logo" src="./assets/chainstep.svg">
            <h3 class="indentL title">Reliability on the Last Mile</h3>
            </div>
            <div class="col headerR"><img class="logo" src="./assets/Mindchains_PB.svg"></div>
        </div>
        <div class="row indentL">
            <div class="col col-sm-3 headerL">
                <button v-if="contract.steps[0].timestamp" class="btn cancel text-uppercase" @click.prevent="reset">
                    <span v-if="contract.steps[contract.steps.length-1].timestamp"><i class="fa fa-undo"></i> Start again</span>
                    <span v-else><i class="fa fa-times"></i> Cancel</span>
                </button>
            </div>
            <div class="col col-sm-9 headerR">
                    <div v-show="contract.address" class="row">
                        <div class="col">
                            <button class="contract btn btn-light" @click.prevent="advance">
                                <span>Contract address: {{ contract.address }}</span>
                            </button>
                        </div>
                    </div>
            </div>
        </div>
        <div class="row">
            <div class="col"><ShippingProgress :steps="contract.steps" @completed="fake_completed" :transaction_in_progress="transaction_in_progress"/></div>
        </div>
        <div class="progress" v-show="transaction_in_progress">
            <button class="btn btn-info">
                <i class="fa fa-spinner fa-spin"></i> {{ transaction_in_progress }}
            </button>
        </div>
    </div>
</template>

<script>
import ShippingProgress from './components/ShippingProgress.vue';
import io from 'socket.io-client';

export default {
    name: 'app',
    components: {
        ShippingProgress
    },
    data: function() {
        return {
            fake_blockchain: false,
            transaction_in_progress: null,
            contract: {
                address: null,
                steps: [
                    {timestamp: null, text: 'Order placed'},
                    {timestamp: null, text: 'Delivery service selected'},
                    {timestamp: null, text: 'Parcel code registered'},
                    {timestamp: null, text: 'Delivery'},
                    {timestamp: null, text: 'Delivery service on site'},
                    {timestamp: null, text: 'Parcel delivered'}
                ]
            },
            socket: io()
        }
    },
    mounted: function() {
        console.log('mounted');
        let vm = this;

        // debug: for the walk-through method
        this.socket.on('data', data => {
            this.transaction_in_progress = null;
            console.log('received data ' + JSON.stringify(data));

            // advance the state of the application
            // FAKE: adjust this to production requirements
            // maybe it should be a trigger for query the state on the blockchain directly!
            vm.fake_completed(data.step, new Date());
            // this.fake_completed(data.step, Date.parse(data.timestamp));
        });

        this.socket.on('new contract', contract => {
            this.transaction_in_progress = null;
            console.log('new contract deployed ' + JSON.stringify(contract));
            if (contract && contract.address) {
                vm.reset();
                vm.contract.address = contract.address;
                if (contract.step != 6) {
                    let d = new Date()
                    d.setTime(contract.timestamp)
                    for (let i=0; i < Math.min(contract.step + 1, vm.contract.steps.length); i++) {
                        if (!vm.contract.steps[i].timestamp) {
                            console.log('catching up with status ' + i)
                            vm.fake_completed(i, d);
                        }
                    }
                }
            } else {
                console.error('Ignoring new and imcomplete contract');
            }
        });

        this.socket.on('status changed', contract => {
            console.log('status changed ' + contract.address);
            this.transaction_in_progress = null;
            if (contract && contract.address && vm.contract.address == contract.address) {
                let d = new Date()
                d.setTime(contract.timestamp)
                vm.fake_completed(contract.step, d);
            } else {
                console.error('Ignoring status update with wrong contract address');
            }
        });

        this.socket.on('ACK', msg => {
            console.log('ACK ' + msg);
            this.transaction_in_progress = msg;
        });

        this.socket.on('ERR', msg => {
            console.log('ERR ' + msg);
            this.transaction_in_progress = null;
        });
    },
    methods: {
        emit: function (event, data, callback) {
            console.log('emit :' + event);
            if (!this.transaction_in_progress) {
                this.transaction_in_progress = "submitted " + event;
                return this.socket.emit(event, data, callback);
            }
        },
        advance: function () {
            console.log('adance');
            let i = 0;
            for (; i < this.contract.steps.length; i++) {
                if (!this.contract.steps[i].timestamp)
                    break;
            }
            this.emit('advance', i, function(data) { console.log(data) });
        },
        order: function () {
            console.log('place order');
            this.emit('place order', null, function(data) { console.log(data) });
        },
        ready_to_accept: function () {
            return this.contract.steps.slice(0, -1).reduce((acc, s) => { return acc && s.timestamp }, true)
                && !this.contract.steps[this.contract.steps.length-1].timestamp
        },
        accept: function () {
            console.log('accept order');
            if (this.ready_to_accept()) {
                this.emit('advance', this.contract.steps.length - 1, function(data) { console.log(data) });
            }
        },
        reset: function () {
            this.transaction_in_progress = null;
            this.fake_completed(0, null);
        },
        fake_completed: function (idx, timestamp) {
            if (idx < 0 || idx >= this.contract.steps.length) {
                throw('ignoring illegal idx ' + idx);
            }
            if (idx === 0 && this.contract.steps[idx].timestamp) {
                console.log('reseting status');
                this.contract.address = null;
                for (let i=0; i < this.contract.steps.length; i=i+1) {
                    this.contract.steps[i].timestamp = null;
                    this.contract.steps[i].action = null;
                }
                return;
            }
            if (idx > 0 && this.contract.steps[idx-1].timestamp === null) {
                throw('ignoring update of idx ' + idx + ', complete the previous entry first');
            }
            if (this.contract.steps[idx].timestamp !== null) {
                throw('ignoring update of idx ' + idx + ', already up to date');
            }

            this.contract.steps[idx].timestamp = timestamp;
            if (idx === 0) {
                console.log('updating action');
                this.contract.steps[idx].action = 'fa fa-shopping-cart';
            } else if (idx === 1) {
                this.contract.steps[idx].action = 'fa fa-search';
            } else if (idx === 2) {
                this.contract.steps[idx].action = 'fa fa-tag';
            } else if (idx === 3) {
                this.contract.steps[idx].action = 'fa fa-truck';
            } else if (idx === 4) {
                this.contract.steps[idx].action = 'fa fa-home';
            } else if (idx === 5) {
                this.contract.steps[idx].action = 'fa fa-check';
            }
        }
    }
}
</script>

<style>
@import url('~bootstrap/dist/css/bootstrap.min.css');
@import url('./assets/arcon.css');

:root {
    --font-family-sans-serif: -apple-system,'Arcon',BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    --bubble-line-height: 1.5;
    --bubble-font-size: 1.2rem;
    --bubble-font-size-time: 1rem;
    --bubble-icon-size: 1.3rem;
    --bubble-size: 5rem;
    --bubble-line-top: 2.5rem;
    --chainstep-blue: #122f5f;
    --chainstep-light-blue: #4387a9;
    --chainstep-grey20: #c8c8c8;
    --chainstep-grey10: #e1e1e1;
}

.title {
  padding-top: 1rem;
}

.indentL {
  padding-left: 1rem;
}

.headerR  {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    text-align: right;
    vertical-align: bottom;
}

.btn.cancel, .btn.order {
    color: white;
    background-color: var(--chainstep-blue);
}

.btn.contract {
    background-color: var(--chainstep-grey10);
}

.white {
    opacity: 0.60;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: white;
}

.overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
}

.progress {
    width: 100%;
    position: absolute;
    z-index: 1000;
    justify-content: center;
    align-items: center;
    bottom: 0;
    left: 0;
    height: 4em;
    background-color: var(--chainstep-grey10);
}

.progress button.btn-info {
  background-color: var(--chainstep-light-blue);
  border-color: var(--chainstep-light-blue);
}

.btn.order {
    z-index: 1000;
    font-size: 270%;
}

@media (max-width: 991.98px) {
    :root {
        --bubble-size: 3rem;
        --bubble-line-top: 1.5rem;
    }

    .headerL, .headerR {
        padding-bottom: 2rem;
    }

    .logo {
        width: 90%;
    }

    .headerR .logo {
        width: 45%;
        margin-left: 0.3rem;
        margin-bottom: 0.7rem;
    }
}

@media (min-width: 992px) {
    .headerL, .headerR  {
        padding-bottom: 4rem;
    }

    .logo {
        width: 80%;
    }

    .headerR .logo {
        width: 30%;
        margin-left: 1rem;
        margin-bottom: 0.5rem;
    }
}


#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    padding: 2rem 2rem 0 2rem;
    color: var(--chainstep-blue);
    font-family: var(--font-family-sans-serif);
}

</style>
