

var module,Timer=function(a){"use strict";
function b(){return"undefined"!=typeof document}
function c(){return A}function d(a,b){return(a%b+b)%b}
function e(a,b,c){var d,e="";for(d=0;b>d;d+=1)e+=String(c);return(e+a).slice(-e.length)}
function f(){this.secondTenths=0,this.seconds=0,this.minutes=0,this.hours=0,this.days=0,this.toString=
    function(a,b,c){a=a||["hours","minutes","seconds"],b=b||":",c=c||2;var d,f,g=[],h="";for(f=0;c>f;f+=1)h+="0";for(f=0;f<a.length;f+=1)void 0!==this[a[f]]&&g.push(e(this[a[f]],c,"0"));return d=g.join(b)}}
    function g(){function a(){return ka.countdown}function e(a,b){fa[a]+=b,ga[a]+=b}function g(a){e(y,a),U("daysUpdated")}
    function B(b){e(x,b),fa.hours=d(fa.hours,o),(a()&&fa.hours===o-1||!a()&&0===fa.hours)&&g(b),_===x&&(ga[w]+=a()?-l:l,ga[v]+=a()?-m:m,ga[u]+=a()?-n:n),U("hoursUpdated")}
    function C(b){e(w,b),fa.minutes=d(fa.minutes,l),(a()&&fa.minutes===l-1||!a()&&0===fa.minutes)&&B(b),_===w&&(ga[v]+=a()?-j:j,ga[u]+=a()?-k:k),U("minutesUpdated")}
    function D(b){e(v,b),fa.seconds=d(fa.seconds,j),(a()&&fa.seconds===j-1||!a()&&0===fa.seconds)&&C(b),_===v&&(ga[u]+=a()?-i:i),U("secondsUpdated")}
    function E(b){e(u,b),fa.secondTenths=d(fa.secondTenths,i),(a()&&fa.secondTenths===i-1||!a()&&0===fa.secondTenths)&&D(b),U("secondTenthsUpdated")}
    function F(){clearInterval($),$=void 0,ia=!1,ja=!1}function G(){var a,b=z[_];switch(_){case y:a=g;break;case x:a=B;break;case w:a=C;break;case u:a=E;break;default:a=D}$=setInterval(
        function(){a(aa),ba(fa),J()&&(U("targetAchieved"),P())},b),ia=!0,ja=!1}
    function H(){return fa.days>ca[t]||fa.days===ca[t]&&(fa.hours>ca[s]||fa.hours===ca[s]&&(fa.minutes>ca[r]||fa.minutes===ca[r]&&(fa.seconds>=ca[q]||fa.seconds===ca[v]&&fa.secondTenths>=ca[p])))}
    function I(){return fa.days<ca[t]||fa.days===ca[t]&&(fa.hours<ca[s]||fa.hours===ca[s]&&(fa.minutes<ca[r]||fa.minutes===ca[r]&&(fa.seconds<ca[q]||fa.seconds===ca[q]&&fa.secondTenths<=ca[p])))}
    function J(){return ca instanceof Array&&(ka.countdown&&I()||!ka.countdown&&H())}function K(){for(var a in fa)fa.hasOwnProperty(a)&&"number"==typeof fa[a]&&(fa[a]=0);for(var a in ga)ga.hasOwnProperty(a)&&"number"==typeof ga[a]&&(ga[a]=0)}
    function L(a){_=a&&"string"==typeof a.precision?a.precision:v,ba=a&&"function"==typeof a.callback?a.callback:
    function(){},aa=a&&a.countdown===!0?-1:1,ea=a&&1==a.countdown,a&&"object"==typeof a.target&&N(a.target),a&&"object"==typeof a.startValues&&O(a.startValues),ca=ca||!ea?ca:[0,0,0,0,0],ka={precision:_,callback:ba,countdown:"object"==typeof a&&1==a.countdown,target:ca,startValues:da}}
    function M(a){var b,c,d,e,f,g;if("object"==typeof a)if(a instanceof Array){if(5!=a.length)throw new Error("Array size not valid");g=a}else g=[a.secondTenths||0,a.seconds||0,a.minutes||0,a.hours||0,a.days||0];for(var h=0;h<a.length;h+=1)a[h]<0&&(a[h]=0);
    return b=g[p],c=g[q]+Math.floor(b/i),d=g[r]+Math.floor(c/j),e=g[s]+Math.floor(d/l),f=g[t]+Math.floor(e/o),g[p]=b%i,g[q]=c%j,g[r]=d%l,g[s]=e%o,g[t]=f,g}
    function N(a){ca=M(a)}
    function O(a){da=M(a),fa.secondTenths=da[p],fa.seconds=da[q],fa.minutes=da[r],fa.hours=da[s],fa.days=da[t],ga.days=fa.days,ga.hours=ga.days*o+fa.hours,ga.minutes=ga.hours*l+fa.minutes,ga.seconds=ga.minutes*j+fa.seconds,ga.secondTenths=ga.seconds*i+fa.secondTenths}
    function P(){F(),K(),U("stopped")}function Q(a){if(this.isRunning())throw new Error("Timer already running");this.isPaused()||L(a),J()||(G(),U("started"))}function R(){F(),ja=!0,U("paused")}
    function S(a,d){b()?ha.addEventListener(a,d):c()&&ha.on(a,d)}function T(a,d){b()?ha.removeEventListener(a,d):c()&&ha.removeListener(a,d)}function U(a){b()?ha.dispatchEvent(new h(a)):c()&&ha.emit(a)}function V(){return ia}function W(){return ja}
    function X(){return fa}function Y(){return ga}function Z(){return ka}var $,_,aa,ba,ca,da,ea,fa=new f,ga=new f,ha=b()?document.createElement("span"):c()?new A.EventEmitter:void 0,ia=!1,ja=!1,ka={};"undefined"!=typeof
     this&&(this.start=Q,this.pause=R,this.stop=P,this.isRunning=V,this.isPaused=W,this.getTimeValues=X,this.getTotalTimeValues=Y,this.getConfig=Z,this.addEventListener=S,this.removeEventListener=T)}
    var h="undefined"!=typeof window?window.CustomEvent:void 0;"undefined"!=typeof window&&"function"!=typeof h&&(h=function(a,b){b=b||{bubbles:!1,cancelable:!1,detail:void 0};var c=document.createEvent("CustomEvent");
        return c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c},h.prototype=window.Event.prototype,window.CustomEvent=h);
    var i=10,j=60,k=600,l=60,m=3600,n=36e3,o=24,p=0,q=1,r=2,s=3,t=4,u="secondTenths",v="seconds",w="minutes",x="hours",y="days",z={secondTenths:100,seconds:1e3,minutes:6e4,hours:36e5,days:864e5},A=a&&a.exports?
    require("events"):void 0;return a&&a.exports?a.exports=g:"function"==typeof define&&define.amd&&define([],
        function(){return g}),g}(module);