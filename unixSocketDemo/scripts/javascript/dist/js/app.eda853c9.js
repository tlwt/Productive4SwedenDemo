(function(t){function e(e){for(var n,r,o=e[0],c=e[1],l=e[2],u=0,d=[];u<o.length;u++)r=o[u],a[r]&&d.push(a[r][0]),a[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);p&&p(e);while(d.length)d.shift()();return i.push.apply(i,l||[]),s()}function s(){for(var t,e=0;e<i.length;e++){for(var s=i[e],n=!0,o=1;o<s.length;o++){var c=s[o];0!==a[c]&&(n=!1)}n&&(i.splice(e--,1),t=r(r.s=s[0]))}return t}var n={},a={app:0},i=[];function r(e){if(n[e])return n[e].exports;var s=n[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=n,r.d=function(t,e,s){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(s,n,function(e){return t[e]}.bind(null,n));return s},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var p=c;i.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"034f":function(t,e,s){"use strict";var n=s("64a9"),a=s.n(n);a.a},1:function(t,e){},"56d7":function(t,e,s){"use strict";s.r(e);s("cadf"),s("551c"),s("097d");var n=s("2b0e"),a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app container"}},[t.contract.address?t._e():s("div",{staticClass:"overlay"},[s("div",{staticClass:"white"}),s("button",{staticClass:"btn btn-lg order text-uppercase",on:{click:function(e){return e.preventDefault(),t.order(e)}}},[t.transaction_in_progress?s("i",{staticClass:"fa fa-spinner fa-spin"}):s("i",{staticClass:"fa fa-shopping-cart"}),t._v("\n            Place order")])]),t.ready_to_accept()?s("div",{staticClass:"overlay"},[s("div",{staticClass:"white"}),s("button",{staticClass:"btn btn-lg order text-uppercase",on:{click:function(e){return e.preventDefault(),t.accept(e)}}},[t.transaction_in_progress?s("i",{staticClass:"fa fa-spinner fa-spin"}):s("i",{staticClass:"fa fa-check"}),t._v("\n            Accept delivery")])]):t._e(),t._m(0),s("div",{staticClass:"row indentL"},[s("div",{staticClass:"col col-sm-3 headerL"},[t.contract.steps[0].timestamp?s("button",{staticClass:"btn cancel text-uppercase",on:{click:function(e){return e.preventDefault(),t.reset(e)}}},[t.contract.steps[t.contract.steps.length-1].timestamp?s("span",[s("i",{staticClass:"fa fa-undo"}),t._v(" Start again")]):s("span",[s("i",{staticClass:"fa fa-times"}),t._v(" Cancel")])]):t._e()]),s("div",{staticClass:"col col-sm-9 headerR"},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.contract.address,expression:"contract.address"}],staticClass:"row"},[s("div",{staticClass:"col"},[s("button",{staticClass:"contract btn btn-light",on:{click:function(e){return e.preventDefault(),t.advance(e)}}},[s("span",[t._v("Contract address: "+t._s(t.contract.address))])])])])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("ShippingProgress",{attrs:{steps:t.contract.steps,transaction_in_progress:t.transaction_in_progress},on:{completed:t.fake_completed}})],1)]),s("div",{directives:[{name:"show",rawName:"v-show",value:t.transaction_in_progress,expression:"transaction_in_progress"}],staticClass:"progress"},[s("button",{staticClass:"btn btn-info"},[s("i",{staticClass:"fa fa-spinner fa-spin"}),t._v(" "+t._s(t.transaction_in_progress)+"\n        ")])])])},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row"},[n("div",{staticClass:"col headerL"},[n("img",{staticClass:"logo",attrs:{src:s("5caf")}}),n("h3",{staticClass:"indentL title"},[t._v("Reliability on the Last Mile")])]),n("div",{staticClass:"col headerR"},[n("img",{staticClass:"logo",attrs:{src:s("859a")}})])])}],r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",{staticClass:"progress-indicator"},t._l(t.steps,function(e,n){return s("li",{key:n,class:{completed:e.timestamp,completed_right:e.timestamp&&n+1<t.steps.length&&t.steps[n+1].timestamp,completed_left:e.timestamp&&n>0&&t.steps[n-1].timestamp}},[s("span",{staticClass:"bubble",attrs:{id:n},on:{click:function(e){return e.preventDefault(),t.completed(e)}}},[s("transition",{attrs:{name:"custom-classes-transition","enter-active-class":"animated bounceInLeft"}},[e.action||t.transaction_in_progress_test(n)?s("i",{key:"icon",class:t.transaction_in_progress_test(n)?t.transaction_in_progress_spinner:e.action}):t._e()])],1),s("span",{staticClass:"text"},[s("div",[s("span",[t._v(t._s(e.text))]),s("transition",{attrs:{name:"custom-classes-transition","enter-active-class":"animated bounceInLeft"}},[e.timestamp?s("span",{key:"timestamp",staticClass:"time"},[t._v(t._s(null!==e.timestamp?t.strftime("%H:%M:%S",e.timestamp):""))]):t._e()])],1)])])}))},o=[],c=(s("c5f6"),s("e9c4")),l={name:"ShippingProgress",props:{steps:Array,transaction_in_progress:Boolean},data:function(){return{transaction_in_progress_spinner:"fa fa-spinner fa-spin"}},methods:{completed:function(t){var e="SPAN"===t.target.tagName?t.target.id:t.target.parentElement.id;this.$emit("completed",Number(e),new Date)},transaction_in_progress_test:function(t){return this.transaction_in_progress&&!this.steps[t].timestamp&&(0==t||this.steps[t-1]&&this.steps[t-1].timestamp)},strftime:c}},p=l,u=(s("8aec"),s("2877")),d=Object(u["a"])(p,r,o,!1,null,"8c6b350c",null);d.options.__file="ShippingProgress.vue";var f=d.exports,m=s("8055"),g=s.n(m),h={name:"app",components:{ShippingProgress:f},data:function(){return{fake_blockchain:!1,transaction_in_progress:null,contract:{address:null,steps:[{timestamp:null,text:"Order placed"},{timestamp:null,text:"Delivery service selected"},{timestamp:null,text:"Parcel code registered"},{timestamp:null,text:"Delivery"},{timestamp:null,text:"Delivery service on site"},{timestamp:null,text:"Parcel delivered"}]},socket:g()()}},mounted:function(){var t=this;console.log("mounted");var e=this;this.socket.on("data",function(s){t.transaction_in_progress=null,console.log("received data "+JSON.stringify(s)),e.fake_completed(s.step,new Date)}),this.socket.on("new contract",function(s){if(t.transaction_in_progress=null,console.log("new contract deployed "+JSON.stringify(s)),s&&s.address){if(e.reset(),e.contract.address=s.address,6!=s.step){var n=new Date;n.setTime(s.timestamp);for(var a=0;a<Math.min(s.step+1,e.contract.steps.length);a++)e.contract.steps[a].timestamp||(console.log("catching up with status "+a),e.fake_completed(a,n))}}else console.error("Ignoring new and imcomplete contract")}),this.socket.on("status changed",function(s){if(console.log("status changed "+s.address),t.transaction_in_progress=null,s&&s.address&&e.contract.address==s.address){var n=new Date;n.setTime(s.timestamp),e.fake_completed(s.step,n)}else console.error("Ignoring status update with wrong contract address")}),this.socket.on("ACK",function(e){console.log("ACK "+e),t.transaction_in_progress=e}),this.socket.on("ERR",function(e){console.log("ERR "+e),t.transaction_in_progress=null})},methods:{emit:function(t,e,s){if(console.log("emit :"+t),!this.transaction_in_progress)return this.transaction_in_progress="submitted "+t,this.socket.emit(t,e,s)},advance:function(){console.log("adance");for(var t=0;t<this.contract.steps.length;t++)if(!this.contract.steps[t].timestamp)break;this.emit("advance",t,function(t){console.log(t)})},order:function(){console.log("place order"),this.emit("place order",null,function(t){console.log(t)})},ready_to_accept:function(){return this.contract.steps.slice(0,-1).reduce(function(t,e){return t&&e.timestamp},!0)&&!this.contract.steps[this.contract.steps.length-1].timestamp},accept:function(){console.log("accept order"),this.ready_to_accept()&&this.emit("advance",this.contract.steps.length-1,function(t){console.log(t)})},reset:function(){this.transaction_in_progress=null,this.fake_completed(0,null)},fake_completed:function(t,e){if(t<0||t>=this.contract.steps.length)throw"ignoring illegal idx "+t;if(0===t&&this.contract.steps[t].timestamp){console.log("reseting status"),this.contract.address=null;for(var s=0;s<this.contract.steps.length;s+=1)this.contract.steps[s].timestamp=null,this.contract.steps[s].action=null}else{if(t>0&&null===this.contract.steps[t-1].timestamp)throw"ignoring update of idx "+t+", complete the previous entry first";if(null!==this.contract.steps[t].timestamp)throw"ignoring update of idx "+t+", already up to date";this.contract.steps[t].timestamp=e,0===t?(console.log("updating action"),this.contract.steps[t].action="fa fa-shopping-cart"):1===t?this.contract.steps[t].action="fa fa-search":2===t?this.contract.steps[t].action="fa fa-tag":3===t?this.contract.steps[t].action="fa fa-truck":4===t?this.contract.steps[t].action="fa fa-home":5===t&&(this.contract.steps[t].action="fa fa-check")}}}},_=h,v=(s("034f"),Object(u["a"])(_,a,i,!1,null,null,null));v.options.__file="App.vue";var b=v.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(b)}}).$mount("#app")},"5caf":function(t,e,s){t.exports=s.p+"img/chainstep.f9c257c7.svg"},"64a9":function(t,e,s){},"730d":function(t,e,s){},"859a":function(t,e,s){t.exports=s.p+"img/Mindchains_PB.a11b89f1.svg"},"8aec":function(t,e,s){"use strict";var n=s("730d"),a=s.n(n);a.a}});
//# sourceMappingURL=app.eda853c9.js.map