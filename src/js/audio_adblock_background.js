!function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=r(1);function n(e){const t={redirectUrl:"https://storage.googleapis.com/memes-d6f47.appspot.com/audio/silent.mp3"};if(o.isAudioAd(e.url))return console.log("Blocking audio ad "+e.url),t;return{cancel:!1}}!function(){if(!function(){try{if(void 0!==chrome)return!0}catch(e){}return!1}())return;chrome.webRequest.onBeforeRequest.hasListener(n)&&chrome.webRequest.onBeforeRequest.removeListener(n);const e=["<all_urls>"],t={urls:e},r=["blocking"];if(e.length>0)try{chrome.webRequest.onBeforeRequest.addListener(n,t,r)}catch(e){console.error(e)}}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isAudioAd=void 0;const o=["https://vd.trinitymedia.ai/audio/playerAudioFiles/en/before-roll.mp3","blob:https://trinitymedia.ai/","https://cmodmedia.live.streamtheworld.com/media/appnexus-audio","https://delivery-cdn-cf.adswizz.com/"];t.isAudioAd=function(e){for(let t of o)if(e.startsWith(t))return!0;return!1}}]);