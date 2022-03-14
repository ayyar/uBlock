/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AudioBlock_1 = __webpack_require__(1);
function inChromeContext() {
    try {
        if (chrome !== undefined) {
            return true;
        }
    }
    catch (e) { }
    return false;
}
// https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/mv2-archive/extensions/catblock
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeRequest#syntax
function updateFilters() {
    if (!inChromeContext()) {
        return;
    }
    if (chrome.webRequest.onBeforeRequest.hasListener(maybeReplaceAudioHandler)) {
        chrome.webRequest.onBeforeRequest.removeListener(maybeReplaceAudioHandler);
    }
    const LISTEN_URLS = '<all_urls>';
    const listenUrlPatterns = [LISTEN_URLS];
    const listenRequestFilter = {
        urls: listenUrlPatterns
    };
    const opt_extraInfoSpec = ['blocking'];
    if (listenUrlPatterns.length > 0) {
        try {
            chrome.webRequest.onBeforeRequest.addListener(maybeReplaceAudioHandler, listenRequestFilter, opt_extraInfoSpec);
        }
        catch (e) {
            console.error(e);
        }
    }
}
function maybeReplaceAudioHandler(details) {
    const blankFile = 'https://storage.googleapis.com/memes-d6f47.appspot.com/audio/silent.mp3';
    const ret2 = {
        redirectUrl: blankFile
    };
    const isAdUrl = AudioBlock_1.isAudioAd(details.url);
    if (isAdUrl) {
        console.log(`Blocking audio ad ${details.url}`);
        return ret2;
    }
    const ret = {
        cancel: false
    };
    return ret;
}
updateFilters();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isAudioAd = void 0;
const AUDIO_AD_PREFIXES = [
    'https://vd.trinitymedia.ai/audio/playerAudioFiles/en/before-roll.mp3',
    'blob:https://trinitymedia.ai/',
    'https://cmodmedia.live.streamtheworld.com/media/appnexus-audio',
    'https://delivery-cdn-cf.adswizz.com/',
];
function isAudioAd(url) {
    for (let prefix of AUDIO_AD_PREFIXES) {
        if (url.startsWith(prefix)) {
            // console.log(`${url} starts with ${prefix}`);
            return true;
        }
    }
    return false;
}
exports.isAudioAd = isAudioAd;


/***/ })
/******/ ]);