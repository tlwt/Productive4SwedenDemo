(function(t){function e(e){for(var n,i,o=e[0],c=e[1],l=e[2],u=0,f=[];u<o.length;u++)i=o[u],a[i]&&f.push(a[i][0]),a[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);p&&p(e);while(f.length)f.shift()();return r.push.apply(r,l||[]),s()}function s(){for(var t,e=0;e<r.length;e++){for(var s=r[e],n=!0,o=1;o<s.length;o++){var c=s[o];0!==a[c]&&(n=!1)}n&&(r.splice(e--,1),t=i(i.s=s[0]))}return t}var n={},a={app:0},r=[];function i(e){if(n[e])return n[e].exports;var s=n[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=n,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var p=c;r.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"022c":function(t,e,s){"use strict";var n=s("fe30"),a=s.n(n);a.a},"034f":function(t,e,s){"use strict";var n=s("64a9"),a=s.n(n);a.a},1:function(t,e){},"56d7":function(t,e,s){"use strict";s.r(e);s("cadf"),s("551c"),s("f751"),s("097d");var n=s("2b0e"),a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app container"}},[t.contract.address?t._e():s("div",{staticClass:"overlay"},[s("div",{staticClass:"white"}),s("button",{staticClass:"btn btn-lg order text-uppercase",on:{click:function(e){return e.preventDefault(),t.order(e)}}},[t.transaction_in_progress?s("i",{staticClass:"fa fa-spinner fa-spin"}):s("i",{staticClass:"fa fa-shopping-cart"}),t._v("\n            Place order")])]),t.ready_to_accept()?s("div",{staticClass:"overlay"},[s("div",{staticClass:"white"}),s("button",{staticClass:"btn btn-lg order text-uppercase",on:{click:function(e){return e.preventDefault(),t.accept(e)}}},[t.transaction_in_progress?s("i",{staticClass:"fa fa-spinner fa-spin"}):s("i",{staticClass:"fa fa-check"}),t._v("\n            Accpet order")])]):t._e(),t._m(0),s("div",{staticClass:"row indentL"},[s("div",{staticClass:"col col-sm-3 headerL"},[t.contract.steps[0].timestamp?s("button",{staticClass:"btn cancel text-uppercase",on:{click:function(e){return e.preventDefault(),t.reset(e)}}},[t.contract.steps[t.contract.steps.length-1].timestamp?s("span",[s("i",{staticClass:"fa fa-undo"}),t._v(" Start again")]):s("span",[s("i",{staticClass:"fa fa-times"}),t._v(" Cancel")])]):t._e()])]),s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("ShippingProgress",{attrs:{steps:t.contract.steps},on:{completed:t.fake_completed}})],1)]),s("div",{directives:[{name:"show",rawName:"v-show",value:t.transaction_in_progress,expression:"transaction_in_progress"}],staticClass:"progress"},[s("button",{staticClass:"btn btn-light"},[s("i",{staticClass:"fa fa-spinner fa-spin"}),t._v(" "+t._s(t.transaction_in_progress)+"\n        ")])])])},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row"},[n("div",{staticClass:"col headerL"},[n("img",{staticClass:"logo",attrs:{src:s("5caf")}})])])}],i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",{staticClass:"progress-indicator"},t._l(t.steps,function(e,n){return s("li",{key:n,class:{completed:e.timestamp,completed_right:e.timestamp&&n+1<t.steps.length&&t.steps[n+1].timestamp,completed_left:e.timestamp&&n>0&&t.steps[n-1].timestamp}},[s("span",{staticClass:"bubble",attrs:{id:n},on:{click:function(e){return e.preventDefault(),t.completed(e)}}},[s("transition",{attrs:{name:"custom-classes-transition","enter-active-class":"animated bounceInLeft"}},[e.action?s("i",{key:"icon",class:e.action}):t._e()])],1),s("span",{staticClass:"text"},[s("div",[s("span",[t._v(t._s(e.text))]),s("transition",{attrs:{name:"custom-classes-transition","enter-active-class":"animated bounceInLeft"}},[e.timestamp?s("span",{key:"timestamp",staticClass:"time"},[t._v(t._s(null!==e.timestamp?t.strftime("%H:%M:%S",e.timestamp):""))]):t._e()])],1)])])}),0)},o=[],c=(s("c5f6"),s("e9c4")),l={name:"ShippingProgress",props:{steps:Array},methods:{completed:function(t){var e="SPAN"===t.target.tagName?t.target.id:t.target.parentElement.id;this.$emit("completed",Number(e),new Date)},strftime:c}},p=l,u=(s("022c"),s("2877")),f=Object(u["a"])(p,i,o,!1,null,"4fd96d51",null),d=f.exports,m=s("8055"),h=s.n(m),g={name:"app",components:{ShippingProgress:d},data:function(){return{fake_blockchain:!1,transaction_in_progress:null,contract:{address:null,steps:[{timestamp:null,text:"Order Placed"},{timestamp:null,text:"Smart Contract Confirmed"},{timestamp:null,text:"Processing Order"},{timestamp:null,text:"Order Finalization"},{timestamp:null,text:"Order Completed"},{timestamp:null,text:"Contract Resolved"}]},socket:h()()}},mounted:function(){var t=this;console.log("mounted");var e=this;this.socket.on("data",function(s){t.transaction_in_progress=null,console.log("received data "+JSON.stringify(s)),e.fake_completed(s.step,new Date)}),this.socket.on("new contract",function(s){t.transaction_in_progress=null,console.log("new contract deployed "+s.address),s&&s.address?(e.reset(),e.contract.address=s.address):console.error("Ignoring new and imcomplete contract")}),this.socket.on("status changed",function(s){if(console.log("status changed "+s.address),t.transaction_in_progress=null,s&&s.address&&e.contract.address==s.address){var n=new Date;n.setTime(s.timestamp),e.fake_completed(s.step,n)}else console.error("Ignoring status update with wrong contract address")}),this.socket.on("ACK",function(e){console.log("ACK "+e),t.transaction_in_progress=e})},methods:{emit:function(t,e,s){if(console.log("emit :"+t),!this.transaction_in_progress)return this.transaction_in_progress="submitted "+t,this.socket.emit(t,e,s)},advance:function(){console.log("advance");for(var t=0;t<this.contract.steps.length;t++)if(!this.contract.steps[t].timestamp)break;this.emit("advance",t,function(t){console.log(t)})},order:function(){console.log("place order"),this.emit("place order",null,function(t){console.log(t)})},ready_to_accept:function(){return this.contract.steps.slice(0,-1).reduce(function(t,e){return t&&e.timestamp},!0)&&!this.contract.steps[this.contract.steps.length-1].timestamp},accept:function(){console.log("accept order"),this.ready_to_accept()&&this.emit("advance",this.contract.steps.length-1,function(t){console.log(t)})},reset:function(){this.fake_completed(0,null)},fake_completed:function(t,e){if(t<0||t>=this.contract.steps.length)throw"ignoring illegal idx "+t;if(0===t&&this.contract.steps[t].timestamp){console.log("reseting status"),this.contract.address=null;for(var s=0;s<this.contract.steps.length;s+=1)this.contract.steps[s].timestamp=null,this.contract.steps[s].action=null}else{if(t>0&&null===this.contract.steps[t-1].timestamp)throw"ignoring update of idx "+t+", complete the previous entry first";if(null!==this.contract.steps[t].timestamp)throw"ignoring update of idx "+t+", already up to date";this.contract.steps[t].timestamp=e,0===t?(console.log("updating action"),this.contract.steps[t].action="fa fa-shopping-cart"):1===t?this.contract.steps[t].action="fa fa-search":2===t?this.contract.steps[t].action="fa fa-tag":3===t?this.contract.steps[t].action="fa fa-truck":4===t?this.contract.steps[t].action="fa fa-home":5===t&&(this.contract.steps[t].action="fa fa-check")}}}},v=g,_=(s("034f"),Object(u["a"])(v,a,r,!1,null,null,null)),b=_.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(b)}}).$mount("#app")},"5caf":function(t,e,s){t.exports=s.p+"img/chainstep.e5690373.svg"},"64a9":function(t,e,s){},fe30:function(t,e,s){}});
//# sourceMappingURL=app.e3f5a77a.js.map