(function(e){function t(t){for(var r,c,i=t[0],u=t[1],l=t[2],d=0,f=[];d<i.length;d++)c=i[d],Object.prototype.hasOwnProperty.call(o,c)&&o[c]&&f.push(o[c][0]),o[c]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);s&&s(t);while(f.length)f.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,i=1;i<n.length;i++){var u=n[i];0!==o[u]&&(r=!1)}r&&(a.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={app:0},a=[];function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var s=u;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),o={id:"nav"};function a(e,t,n,a,c,i){var u=Object(r["e"])("Game");return Object(r["d"])(),Object(r["b"])("div",o,[Object(r["c"])(u)])}Object(r["f"])("data-v-3a3974a8");var c={class:"game"};function i(e,t,n,o,a,i){return Object(r["d"])(),Object(r["b"])("div",c,[Object(r["c"])("canvas",{id:"canvas",ref:"game",width:a.canvas.w,height:a.canvas.h,style:{border:"2px dotted black"},tabindex:"0",onKeypress:t[1]||(t[1]=function(e){return i.hareket(e)})},null,40,["width","height"])])}Object(r["f"])(null);n("a434");var u=n("8e27"),l=n.n(u),s={name:"Game",data:function(){return{socket:{},context:{},canvas:{h:600,w:600},oyuncular:[],timer:null,index:-1,data:[]}},created:function(){this.socket=l()("/")},mounted:function(){var e=this;this.context=this.$refs.game.getContext("2d"),this.socket.on("AllPlayer",(function(t){e.oyuncular=t,console.log("test AllPlayer")})),setInterval((function(){e.context.clearRect(0,0,600,600);for(var t=0;t<e.oyuncular.length;t++)e.oyuncular[t].id==e.socket.id?e.context.fillStyle="blue":e.context.fillStyle=e.oyuncular[t].c,e.context.fillRect(e.oyuncular[t].x,e.oyuncular[t].y,e.oyuncular[t].gen,e.oyuncular[t].gen);console.log("test setInterval")}),20),this.socket.on("exitPlayer",(function(t){for(var n=0;n<e.oyuncular.length;n++)e.oyuncular[n].id==t&&e.oyuncular.splice(n,1)}))},methods:{hareket:function(e){for(var t=0;t<this.oyuncular.length;t++)this.socket.id==this.oyuncular[t].id&&(this.index=t);"W"!=e.key&&"w"!=e.key||(this.oyuncular[this.index].y-=5),"S"!=e.key&&"s"!=e.key||(this.oyuncular[this.index].y+=5),"A"!=e.key&&"a"!=e.key||(this.oyuncular[this.index].x-=5),"D"!=e.key&&"d"!=e.key||(this.oyuncular[this.index].x+=5),this.data=[this.oyuncular[this.index].x,this.oyuncular[this.index].y,this.oyuncular[this.index].id,this.index],this.socket.emit("AllPlayer",this.data)},tikla:function(){this.socket.on("AllPlayer",(function(e){console.log(e)}))}}};s.render=i,s.__scopeId="data-v-3a3974a8";var d=s,f={name:"app",components:{Game:d},data:function(){return{}},created:function(){}};f.render=a;var h=f;Object(r["a"])(h).mount("#app")}});
//# sourceMappingURL=app.b1917422.js.map