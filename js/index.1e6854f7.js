(function(e){function t(t){for(var r,o,i=t[0],s=t[1],u=t[2],d=0,b=[];d<i.length;d++)o=i[d],Object.prototype.hasOwnProperty.call(c,o)&&c[o]&&b.push(c[o][0]),c[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);l&&l(t);while(b.length)b.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,i=1;i<n.length;i++){var s=n[i];0!==c[s]&&(r=!1)}r&&(a.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},c={index:0},a=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/bitcoin-app/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var l=s;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"0fbc":function(e,t,n){},"1a44":function(e,t,n){"use strict";n("d219")},"3c5a":function(e,t,n){},"57dc":function(e,t,n){},"5c1e":function(e,t,n){},"6e70":function(e,t,n){e.exports=n.p+"img/loader.f16ad9fd.svg"},"736c":function(e,t,n){"use strict";n("5c1e")},a4e3:function(e,t,n){"use strict";n("3c5a")},b412:function(e,t,n){"use strict";n("57dc")},be48:function(e,t,n){},c03d:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23");function c(e,t,n,c,a,o){var i=Object(r["r"])("UnconfirmedTransactions");return Object(r["l"])(),Object(r["d"])(i)}var a={class:"controls__container"},o={key:0,class:"loading"},i=Object(r["h"])(" Не удалось подключиться "),s={key:2,class:"controls"},u=Object(r["h"])(" Запуск "),l=Object(r["h"])(" Остановка "),d=Object(r["h"])(" Сброс "),b={class:"sum"},f={class:"table-container"};function O(e,t,n,c,O,j){var v=Object(r["r"])("Loader"),p=Object(r["r"])("Alert"),g=Object(r["r"])("Button"),m=Object(r["r"])("UnconfirmedTransactionsTable"),h=Object(r["r"])("Container");return Object(r["l"])(),Object(r["d"])(h,null,{default:Object(r["t"])((function(){return[Object(r["g"])("div",a,[e.notAvailable||e.ready?Object(r["e"])("",!0):(Object(r["l"])(),Object(r["f"])("div",o,[Object(r["i"])(v),Object(r["h"])(" "+Object(r["s"])(e.loaderMessage),1)])),e.notAvailable?(Object(r["l"])(),Object(r["d"])(p,{key:1,kind:"warning"},{default:Object(r["t"])((function(){return[i]})),_:1})):Object(r["e"])("",!0),e.ready?(Object(r["l"])(),Object(r["f"])("div",s,[Object(r["i"])(g,{kind:"success",size:"xl",disabled:e.listening,onClick:e.start},{default:Object(r["t"])((function(){return[u]})),_:1},8,["disabled","onClick"]),Object(r["i"])(g,{kind:"danger",size:"xl",disabled:!e.listening,onClick:e.stop},{default:Object(r["t"])((function(){return[l]})),_:1},8,["disabled","onClick"]),Object(r["i"])(g,{kind:"warning",size:"xl",disabled:!e.transactions.length,onClick:e.clear},{default:Object(r["t"])((function(){return[d]})),_:1},8,["disabled","onClick"])])):Object(r["e"])("",!0)]),Object(r["g"])("div",b," Сумма: "+Object(r["s"])(e.btcToString(e.sum)),1),Object(r["g"])("div",f,[Object(r["i"])(m,{transactions:e.transactions},null,8,["transactions"])])]})),_:1})}n("d81d"),n("d3b7");var j=n("3835"),v=n("b85c"),p=n("4478"),g=(n("4ec9"),n("3ca3"),n("ddb0"),n("a434"),n("159b"),n("e9c4"),function(e,t,n){console[e](t,JSON.stringify(n))}),m=n("bee2"),h=n("d4ec"),k=n("262e"),y=n("2caf"),_=n("9072"),w=(n("d9e2"),function(e){Object(k["a"])(n,e);var t=Object(y["a"])(n);function n(e){return Object(h["a"])(this,n),t.call(this,"Maximum number of retries exceeded: ".concat(e))}return Object(m["a"])(n)}(Object(_["a"])(Error)));function x(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var c=0,a=Object(r["o"])(!1),o=new Map([["open",[]],["close",[]],["message",[]],["error",[]]]),i=function(e,t){u.addEventListener(e,t);var n=o.get(e);n&&n.push(t)},s=function(e,t){u.removeEventListener(e,t);var n=o.get(e);if(n){var r=n.indexOf(t);-1!==r&&n.splice(r,1)}},u=Object(p["a"])(WebSocket,t),l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3;if(c===e)throw new w(e);c++,u=Object(p["a"])(WebSocket,t);var n,r=Object(v["a"])(o.entries());try{var a=function(){var e=Object(j["a"])(n.value,2),t=e[0],r=e[1];r.forEach((function(e){return u.addEventListener(t,e)}))};for(r.s();!(n=r.n()).done;)a()}catch(i){r.e(i)}finally{r.f()}},d=function(){o.clear(),o.set("open",[]),o.set("close",[]),o.set("message",[]),o.set("error",[]),u.close()};i("open",(function(){a.value=!0})),i("close",(function(){a.value=!1})),i("error",(function(e){u.readyState!==u.OPEN&&(a.value=!1),g("error","socket",{socket:u,event:e,options:t})}));var b=function(e){u.send(JSON.stringify(e))},f=function(e){i("open",e)},O=function(e){i("close",e)},m=function(e){i("error",e)},h=function(e){i("message",e)};return{ready:a,send:b,close:d,reconnect:l,onOpen:f,onClose:O,onError:m,onMessage:h,addEventListener:i,removeEventListener:s}}var S=function(e){return"utx"===e.op},T=3e3;function L(e){var t=x("wss://ws.blockchain.info/inv"),n=Object(r["o"])(),c=Object(r["o"])(!1),a=function(){var e=setInterval((function(){t.send({op:"ping"})}),T);return function(){clearInterval(e)}},o=function(){t.ready.value&&(t.send({op:"unconfirmed_sub"}),c.value=!0,t.addEventListener("message",s))},i=function(){t.ready.value&&(t.send({op:"unconfirmed_unsub"}),c.value=!1,t.removeEventListener("message",s))};function s(t){var n=JSON.parse(t.data);S(n)&&e&&e(n)}return t.onError((function(e){n.value=e})),{listening:c,error:n,start:o,stop:i,keepAlive:a,websocket:t}}n("b680"),n("4d90"),n("a9e3"),n("99af");var C=function(e){return"".concat(e.toFixed(8)," BTC")};function E(e){var t=String(e).padStart(8,"0");return Number("".concat(t.substring(0,t.length-8),".").concat(t.substring(t.length-8)))}function A(e,t,n,c,a,o){return Object(r["l"])(),Object(r["f"])("button",{class:Object(r["k"])(e.className)},[Object(r["q"])(e.$slots,"default",{},void 0,!0)],2)}var I={default:"",primary:"button_kind-primary",secondary:"button_kind-secondary",success:"button_kind-success",danger:"button_kind-danger",warning:"button_kind-warning"},M=Object(r["j"])({name:"Button",props:{kind:{type:String,default:"default"}},setup:function(e){return{className:["button",I[e.kind]]}}}),N=(n("1a44"),n("6b0d")),P=n.n(N);const U=P()(M,[["render",A],["__scopeId","data-v-51de4d5c"]]);var q=U,J=function(e){return Object(r["n"])("data-v-810b1600"),e=e(),Object(r["m"])(),e},B=J((function(){return Object(r["g"])("thead",null,[Object(r["g"])("tr",null,[Object(r["g"])("th",{class:"address"}," From "),Object(r["g"])("th",{class:"address"}," To "),Object(r["g"])("th",{class:"sum"}," Sum ")])],-1)}));function $(e,t,n,c,a,o){var i=Object(r["r"])("Link");return Object(r["l"])(),Object(r["f"])("table",null,[B,Object(r["g"])("tbody",null,[(Object(r["l"])(!0),Object(r["f"])(r["a"],null,Object(r["p"])(e.transactions,(function(t){return Object(r["l"])(),Object(r["f"])("tr",{key:t.hash},[Object(r["g"])("td",null,[(Object(r["l"])(!0),Object(r["f"])(r["a"],null,Object(r["p"])(t.from,(function(e){return Object(r["l"])(),Object(r["d"])(i,{key:e,href:"https://www.blockchain.com/btc/address/".concat(e),target:"_blank"},{default:Object(r["t"])((function(){return[Object(r["h"])(Object(r["s"])(e),1)]})),_:2},1032,["href"])})),128))]),Object(r["g"])("td",null,[(Object(r["l"])(!0),Object(r["f"])(r["a"],null,Object(r["p"])(t.to,(function(e){return Object(r["l"])(),Object(r["d"])(i,{key:e,href:"https://www.blockchain.com/btc/address/".concat(e),target:"_blank"},{default:Object(r["t"])((function(){return[Object(r["h"])(Object(r["s"])(e),1)]})),_:2},1032,["href"])})),128))]),Object(r["g"])("td",null,Object(r["s"])(e.btcToString(t.value)),1)])})),128))])])}var z={class:"link"};function F(e,t,n,c,a,o){return Object(r["l"])(),Object(r["f"])("a",z,[Object(r["q"])(e.$slots,"default",{},void 0,!0)])}var W={name:"Link"};n("e207");const D=P()(W,[["render",F],["__scopeId","data-v-2e629cf9"]]);var G=D,H=Object(r["j"])({name:"UnconfirmedTransactionsTable",components:{Link:G},props:{transactions:{type:Array,required:!0}},setup:function(){return{btcToString:C}}});n("b412");const K=P()(H,[["render",$],["__scopeId","data-v-810b1600"]]);var Q=K,R={class:"container"};function V(e,t,n,c,a,o){return Object(r["l"])(),Object(r["f"])("div",R,[Object(r["q"])(e.$slots,"default",{},void 0,!0)])}var X={name:"Container"};n("736c");const Y=P()(X,[["render",V],["__scopeId","data-v-69941ba0"]]);var Z=Y,ee=n("6e70"),te=n.n(ee),ne={class:"loader",src:te.a,alt:"Загрузка"};function re(e,t,n,c,a,o){return Object(r["l"])(),Object(r["f"])("img",ne)}var ce={name:"Loader"};n("a4e3");const ae=P()(ce,[["render",re],["__scopeId","data-v-19a2d17f"]]);var oe=ae;function ie(e,t,n,c,a,o){return Object(r["l"])(),Object(r["f"])("div",{class:Object(r["k"])(e.className)},[Object(r["q"])(e.$slots,"default",{},void 0,!0)],2)}var se={default:"",primary:"alert_kind-primary",secondary:"alert_kind-secondary",success:"alert_kind-success",danger:"alert_kind-danger",warning:"alert_kind-warning"},ue=Object(r["j"])({name:"Alert",props:{kind:{type:String,default:"default"}},setup:function(e){return{className:["alert",se[e.kind]]}}});n("cea6");const le=P()(ue,[["render",ie],["__scopeId","data-v-6f8eee14"]]);var de=le,be=Object(r["j"])({name:"UnconfirmedTransactions",components:{Alert:de,Loader:oe,Container:Z,UnconfirmedTransactionsTable:Q,Button:q},setup:function(){var e=L(l),t=e.listening,n=e.error,c=e.start,a=e.stop,o=e.keepAlive,i=e.websocket,s=Object(r["o"])([]),u=Object(r["o"])(0);function l(e){var t=b(e);s.value.push(t),u.value+=t.value}var d=function(){s.value=[],u.value=0};function b(e){return{hash:e.x.hash,from:e.x.inputs.map((function(e){return e.prev_out.addr})),to:e.x.out.map((function(e){return e.addr})),value:e.x.inputs.reduce((function(e,t){return e+E(t.prev_out.value)}),0)}}var f=Object(r["b"])((function(){return n.value?"Произошла ошибка, переподключение...":"Подключение"})),O=Object(r["o"])(!1);return i.onOpen((function(){o()})),i.onClose((function(){try{i.reconnect()}catch(e){e instanceof w&&(O.value=!0)}})),{transactions:s,listening:t,ready:i.ready,loaderMessage:f,stop:a,start:c,clear:d,sum:u,notAvailable:O,btcToString:C}}});n("f27b");const fe=P()(be,[["render",O],["__scopeId","data-v-6e160547"]]);var Oe=fe,je=Object(r["j"])({name:"App",components:{UnconfirmedTransactions:Oe}});const ve=P()(je,[["render",c]]);var pe=ve;n("fce9");Object(r["c"])(pe).mount("#app")},cea6:function(e,t,n){"use strict";n("c03d")},d219:function(e,t,n){},e207:function(e,t,n){"use strict";n("be48")},f27b:function(e,t,n){"use strict";n("0fbc")},fce9:function(e,t,n){}});
//# sourceMappingURL=index.1e6854f7.js.map