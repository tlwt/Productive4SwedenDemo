<template>
    <ul class="progress-indicator">
        <li v-for="(step, key) in steps" :key="key" :class="{ completed : step.timestamp, completed_right : (step.timestamp && key + 1 < steps.length && steps[key+1].timestamp ),  completed_left : (step.timestamp && key > 0 && steps[key-1].timestamp ) }">
            <span class="bubble" @click.prevent="completed" :id="key">
                <transition name="custom-classes-transition" enter-active-class="animated bounceInLeft">
                <i v-if="step.action" :class="step.action" key="icon"></i>
                </transition>
            </span>
            <span class="text"><div><span>{{ step.text }}</span>
                <transition name="custom-classes-transition" enter-active-class="animated bounceInLeft">
                <span class="time" v-if="step.timestamp" key="timestamp">{{ step.timestamp !== null ? strftime('%H:%M:%S', step.timestamp) : "" }}</span>
                </transition>
                </div>
            </span>
        </li>
    </ul>
</template>

<script>
const strftime = require('strftime');

export default {
    name: 'ShippingProgress',
    props: {
        steps: Array
    },
    methods: {
        completed: function (event) {
            let id = event.target.tagName === 'SPAN' ? event.target.id : event.target.parentElement.id;
            this.$emit('completed', Number(id), new Date());
        },
        strftime: strftime
    }
}
</script>

<style scoped>
@import url('~css_progress_wizard/css/progress-wizard.min.css');
@import url('~animate.css/animate.min.css');
@import url('~font-awesome/css/font-awesome.min.css');

.time {
    display: block;
    font-size: var(--bubble-font-size-time);
    font-weight: normal;
    color: var(--chainstep-blue);
}

.progress-indicator {
    text-transform: initial;
}

.progress-indicator > li .bubble {
    height: var(--bubble-size);
    width: var(--bubble-size);
    font-size: var(--bubble-icon-size);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--chainstep-blue);

    cursor: pointer;
}

.progress-indicator > li.completed .bubble {
    color: white;

    cursor: initial;
}

.progress-indicator > li:first-child.completed .bubble {
    cursor: pointer;
}

.progress-indicator .text {
    color: var(--chainstep-light-blue);
    font-size: var(--bubble-font-size);
    line-height: var(--bubble-line-height);
    padding: 0 0.3rem;
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
}

.text > div {
    display: block;
    text-align: left;
    margin-left: 25%;
    width: 75%;
}

.progress-indicator > li .bubble,
.progress-indicator > li .bubble::before,
.progress-indicator > li .bubble::after,
.progress-indicator > li.completed .bubble,
.progress-indicator > li.completed .bubble::before,
.progress-indicator > li.completed .bubble::after {
    background-color: var(--chainstep-grey20);
}

.progress-indicator > li.completed .bubble,
.progress-indicator > li.completed_left .bubble::before,
.progress-indicator > li.completed_right .bubble::after {
    background-color: var(--chainstep-light-blue);
    border-color: var(--chainstep-blue);
}

.progress-indicator > li:first-child .bubble::before,
.progress-indicator > li:first-child .bubble::after {
    margin-left: 65%;
}

.progress-indicator .bubble {
    color: white;
    font-weight: bold;
}

.progress-indicator > li.completed .text {
    font-weight: bold;
}

.progress-indicator .bubble::before,
.progress-indicator .bubble::after,
.progress-indicator > li:first-child .bubble::before,
.progress-indicator > li:first-child .bubble::after,
.progress-indicator > li.completed .bubble::before,
.progress-indicator > li.completed .bubble::after,
.progress-indicator > li:last-child .bubble::before,
.progress-indicator > li:last-child .bubble::after {
    width: 35%;
    z-index: -1;
}

.progress-indicator > li:first-child .bubble::before,
.progress-indicator > li:last-child .bubble::after {
    display: none;
}

.progress-indicator .bubble::before,
.progress-indicator .bubble::after {
    top: var(--bubble-line-top);
}

</style>
