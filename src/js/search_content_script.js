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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = __webpack_require__(3);
function getAssetUrl() {
    return Utils_1.inChromeContext() ? chrome.runtime.getURL('assets') : '.';
}
function getExtensionId() {
    if (Utils_1.inChromeContext()) {
        return chrome.runtime.id;
    }
    return 'reactExtensionId';
}
function getMessage(key, fallback = undefined) {
    if (Utils_1.inChromeContext()) {
        const ret = chrome.i18n.getMessage(key);
        if (ret.length > 0) {
            return ret;
        }
    }
    if (fallback !== undefined) {
        return fallback;
    }
    return key;
}
function getUiLocale() {
    if (Utils_1.inChromeContext()) {
        const locale = getMessage('@@ui_locale');
        if (locale) {
            return locale;
        }
    }
    return 'unknown';
}
function getExtVersion() {
    let version = 'unknown';
    if (Utils_1.inChromeContext() === false) {
        return version;
    }
    if (chrome.runtime &&
        chrome.runtime.getManifest() &&
        chrome.runtime.getManifest().version) {
        version = chrome.runtime.getManifest().version;
    }
    return version;
}
const EXTENSION_ASSETS_URL = getAssetUrl();
const EXTENSION_ID = getExtensionId();
const EXTENSION_UI_LOCALE = getUiLocale();
var WAUILoopStarted = false;
async function sendBackgroundRequest(request) {
    const response = await new Promise((resolve, reject) => chrome.runtime.sendMessage(request, resolve));
    return response;
}
const PAYWALLED_SITES = {
    'www.bloomberg.com': {
        walled: {
            paywalled: 'aggressive'
        }
    },
    'www.wsj.com': {
        walled: {
            paywalled: 'aggressive'
        }
    },
    'seekingalpha.com': {
        walled: {
            paywalled: 'aggressive'
        }
    },
    'www.forbes.com': {
        ux: {
            bloat: 'high'
        }
    },
    'money.usnews.com': {
        ux: {
            bloat: 'high'
        }
    },
    'www.nytimes.com': {
        walled: {
            paywalled: 'aggressive'
        }
    },
    'cooking.nytimes.com': {
        walled: {
            paywalled: 'aggressive'
        }
    },
    'www.washingtonpost.com': {
        walled: {
            paywalled: 'aggressive'
        }
    },
    'nypost.com': {
        ux: {
            bloat: 'high'
        }
    },
    'glassdoor.com': {
        walled: {
            loginwall: 'aggressive'
        }
    },
    'www.quora.com': {
        walled: {
            loginwall: 'aggressive'
        }
    },
    'reuters.com': {
        walled: {
            metered: 'aggressive'
        }
    },
    'www.reuters.com': {
        walled: {
            metered: 'aggressive'
        }
    },
    'www.theatlantic.com': {
        walled: {
            metered: 'aggressive'
        }
    },
    'time.com': {
        walled: {
            metered: 'aggressive'
        }
    },
    'www.usatoday.com': {
        ux: {
            bloat: 'high'
        }
    },
    'www.fool.com': {
        ux: {
            clickbait: true
        }
    },
    'www.wired.com': {
        walled: {
            loginwall: 'mild'
        }
    },
    'theathletic.com': {
        walled: {
            paywalled: 'aggressive'
        }
    },
    'www.thestreet.com': {
        ux: {
            bloat: 'high'
        }
    },
    'venturebeat.com': {
        ux: {
            bloat: 'high'
        }
    },
    'www.sfgate.com': {
        ux: {
            bloat: 'low'
        }
    },
    'www.barrons.com': {
        walled: {
            paywalled: 'aggressive'
        }
    },
    'www.nbcsports.com': {
        ux: {
            bloat: 'high'
        }
    },
    'www.ft.com': {
        walled: {
            paywalled: 'aggressive'
        }
    },
    'www.economist.com': {
        walled: {
            paywalled: 'aggressive'
        }
    },
    'natashaskitchen.com': {
        ux: {
            bloat: 'high'
        }
    },
    'www.allrecipes.com': {
        ux: {
            bloat: 'high'
        }
    },
    'www.southernliving.com': {
        ux: {
            bloat: 'high'
        }
    },
    'www.twopeasandtheirpod.com': {
        ux: {
            bloat: 'high'
        }
    },
    'nymag.com': {
        walled: {
            paywalled: 'aggressive'
        }
    },
    'www.latimes.com': {
        walled: {
            paywalled: 'aggressive'
        }
    },
    'www.chicagotribune.com': {
        walled: {
            paywalled: 'aggressive'
        }
    },
    'www.rollingstone.com': {
        walled: {
            paywalled: 'mild'
        }
    },
    'www.nationalgeographic.com': {
        walled: {
            paywalled: 'aggressive'
        }
    },
    'www.jocooks.com': {
        ux: {
            bloat: 'low'
        }
    },
    'www.chelseasmessyapron.com': {
        ux: {
            bloat: 'low'
        }
    },
    'www.theaustralian.com.au': {
        walled: {
            paywalled: 'aggressive'
        }
    },
    'www.bostonglobe.com': {
        walled: {
            paywalled: 'aggressive'
        }
    },
    'www.telegraph.co.uk': {
        walled: {
            paywalled: 'aggressive'
        }
    },
    'www.bostonherald.com': {
        walled: {
            metered: 'aggressive'
        }
    },
    'www.smh.com.au': {
        walled: {
            metered: 'aggressive'
        }
    },
    'technologyreview.com': {
        walled: {
            metered: 'aggressive'
        }
    },
    'www.thetimes.co.uk': {
        walled: {
            metered: 'aggressive'
        }
    },
    'www.scientificamerican.com': {
        walled: {
            metered: 'aggressive'
        }
    },
    'www.thestar.com': {
        walled: {
            metered: 'aggressive'
        }
    },
    'www.lemonde.fr': {
        walled: {
            metered: 'aggressive'
        }
    }
};
function hasPaywall(labelData) {
    const walled = labelData.walled;
    if (walled === undefined) {
        return false;
    }
    const hasPaywall = walled.loginwall !== 'none' ||
        walled.metered !== 'none' ||
        walled.paywalled !== 'none';
    return hasPaywall;
}
function hasUxIssue(labelData) {
    const ux = labelData.ux;
    if (ux === undefined) {
        return false;
    }
    const hasUxIssues = !!(ux.bot_generated || ux.clickbait);
    return hasUxIssues;
}
function getPaywallTooltipText(labelData) {
    if (!hasPaywall(labelData)) {
        return '';
    }
    const walled = labelData.walled;
    let tooltip = '';
    if (walled.paywalled === 'mild') {
        tooltip = 'PAYWALL: Some content on this site is paywalled.';
    }
    else if (walled.paywalled === 'aggressive') {
        tooltip = 'PAYWALL: Most content on this site is paywalled.';
    }
    else if (walled.metered === 'mild' || walled.metered === 'aggressive') {
        tooltip =
            'PAYWALL: Allows you to view a number of items before making you pay.';
    }
    else if (walled.loginwall === 'mild' || walled.loginwall === 'aggressive') {
        tooltip = 'LOGIN WALL: This site requires logging in to view content.';
    }
    return tooltip;
}
function getUxIssueTooltipText(labelData) {
    if (!hasUxIssue(labelData)) {
        return '';
    }
    const ux = labelData.ux;
    let tooltip = '';
    if (ux.clickbait) {
        tooltip = 'Contains clickbait content.';
    }
    else if (ux.bot_generated) {
        tooltip = 'Bot-generated content.';
    }
    else if (ux.bloat) {
        const bloatText = ux.bloat === 'high' ? 'excessive number of ads' : 'some ads';
        tooltip = `Contains ${bloatText}.`;
    }
    return tooltip;
}
async function createWaUI() {
    if (WAUILoopStarted) {
        return;
    }
    WAUILoopStarted = true;
    const searchResultLinks = document.querySelectorAll('a');
    for (let link of searchResultLinks) {
        if (link && link.href) {
            const resultURL = new URL(link.href);
            if (resultURL.hostname in PAYWALLED_SITES &&
                resultURL.hostname !== window.location.hostname) {
                const labelData = PAYWALLED_SITES[resultURL.hostname];
                if (hasPaywall(labelData)) {
                    link.classList.add('paywall-detected');
                    link.setAttribute('title', getPaywallTooltipText(labelData));
                }
                if (hasUxIssue(labelData)) {
                    link.classList.add('ux-issue-detected');
                    link.setAttribute('title', getUxIssueTooltipText(labelData));
                }
            }
        }
    }
}
async function WA_main() {
    createWaUI();
}
WA_main();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Type declarations.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeatureDoubleSlashRedirecting = exports.getFeatureUrlLength = exports.getBrowserWrapper = exports.removeElements = exports.logCanvas = exports.loadImage = exports.getImgUrl = exports.hasAnyCanonicalLanguages = exports.getCanonicalLanguage = exports.getGlobals = exports.getAppType = exports.AppType = exports.sleep = exports.sum = exports.inSafariContext = exports.inChromeContext = exports.asyncify3 = exports.asyncify2 = exports.asyncify1 = exports.asyncify = void 0;
async function asyncify(functionWithCallback, ...args) {
    const ret = new Promise((resolve, reject) => functionWithCallback(...args, resolve));
    return ret;
}
exports.asyncify = asyncify;
async function asyncify1(functionWithCallback, arg0) {
    const ret = new Promise((resolve, reject) => functionWithCallback(arg0, resolve));
    return ret;
}
exports.asyncify1 = asyncify1;
async function asyncify2(functionWithCallback, arg0, arg1) {
    const ret = new Promise((resolve, reject) => functionWithCallback(arg0, arg1, resolve));
    return ret;
}
exports.asyncify2 = asyncify2;
async function asyncify3(functionWithCallback, arg0, arg1, arg2) {
    const ret = new Promise((resolve, reject) => functionWithCallback(arg0, arg1, arg2, resolve));
    return ret;
}
exports.asyncify3 = asyncify3;
// clang-format on
// Functions.
function safeGet(x, defaultValue) {
    return x !== null && x !== undefined ? x : defaultValue;
}
function checkNotNull(x) {
    return x !== null && x !== undefined;
}
// eslint-disable-next-line
function pickRandomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}
function inChromeContext() {
    try {
        if (chrome !== undefined && chrome.runtime !== undefined) {
            return true;
        }
    }
    catch (e) { }
    return false;
}
exports.inChromeContext = inChromeContext;
function inSafariContext() {
    try {
        // @ts-ignore
        if (browser !== undefined && browser.runtime !== undefined) {
            return true;
        }
    }
    catch (e) { }
    return false;
}
exports.inSafariContext = inSafariContext;
function sum(x, y) {
    return x + y;
}
exports.sum = sum;
exports.sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function checkExtensionName(name) {
    if (!inChromeContext()) {
        return false;
    }
    const msg1 = chrome.i18n.getMessage(name);
    const msg2 = chrome.runtime.getManifest().name;
    return msg1 === msg2;
}
const PAYWALL_DETECTOR_GLOBALS = {
    feedbackUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdRkeOFgAg7_g5zrx1DvbNzy83D_E6NhW0wd72I62HOd65C2w/viewform?usp=sf_link',
};
const GLOBALS = {
    paywall_detector: PAYWALL_DETECTOR_GLOBALS
};
var AppType;
(function (AppType) {
    AppType["APP_PAYWALL_DETECTOR"] = "paywall_detector";
})(AppType = exports.AppType || (exports.AppType = {}));
function getAppType() {
    return AppType.APP_PAYWALL_DETECTOR;
}
exports.getAppType = getAppType;
function getGlobals() {
    return GLOBALS[getAppType()];
}
exports.getGlobals = getGlobals;
function getCanonicalLanguages(languages) {
    const canonicalLanguages = languages.map((language) => language.split('-')[0]);
    return canonicalLanguages;
}
function getCanonicalLanguage(languages) {
    const canonicalLanguages = getCanonicalLanguages(languages);
    const langs = new Set(canonicalLanguages);
    // https://stackoverflow.com/a/36042028
    // Treat any non english language as
    const ret = langs.size === 1 ? Array.from(langs)[0] : canonicalLanguages[0];
    return ret;
}
exports.getCanonicalLanguage = getCanonicalLanguage;
function hasAnyCanonicalLanguages(languagesToCheck, browserLanguages = navigator.languages) {
    const canonicalLanguages = new Set(getCanonicalLanguages(browserLanguages));
    return languagesToCheck.some((lang) => canonicalLanguages.has(lang));
}
exports.hasAnyCanonicalLanguages = hasAnyCanonicalLanguages;
function getImgUrl(urlStr) {
    if (urlStr === undefined) {
        return null;
    }
    const url = new URL(urlStr);
    const params = new URLSearchParams(url.search);
    const arg = params.get('imgurl');
    return arg;
}
exports.getImgUrl = getImgUrl;
async function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => reject(null);
        img.src = url;
    });
}
exports.loadImage = loadImage;
function logCanvas(canvas) {
    const data = canvas.toDataURL();
    console.log('%c ', `font-size:${canvas.height}px; background:url(${data}) no-repeat;`);
}
exports.logCanvas = logCanvas;
function removeElement(element) {
    let ret = false;
    if (element.parentElement && typeof element.parentElement !== 'undefined') {
        const removeChild = element.parentElement.removeChild(element);
        ret = !!removeChild;
    }
    return ret;
}
function removeElements() {
    const badDivs = [
        "div[class^='OUTBRAIN']",
        "div[class^='outbrain']",
        'div[id*=taboola]',
        'div[class*=taboola]',
        'div[class*=adspace-widget]',
        'div[data-act-id="outbrain_smartfeed_0"]',
        `div[class^='dianomi']`,
        "iframe[id^='_mN_main']",
        "div[class^='ym']"
    ];
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll#examples
    // https://www.w3schools.com/cssref/css_selectors.asp
    let removedCount = 0;
    for (let badDiv of badDivs) {
        const elements = document.querySelectorAll(badDiv);
        console.log(`Found ${elements.length} elements for ${badDiv}`);
        for (let element of elements) {
            const removedSuccess = removeElement(element);
            removedSuccess && removedCount++;
        }
    }
    console.log(`Removed ${removedCount} native ads.`);
    return removedCount;
}
exports.removeElements = removeElements;
function getBrowserWrapper() {
    // @ts-ignore
    return inSafariContext() ? browser : chrome;
}
exports.getBrowserWrapper = getBrowserWrapper;
// Features for TFJS phishing URL detection model. For more info:
// https://docs.google.com/document/d/1Pj6QXTWK8KuHGUtwGOR7-YVMWbKYbVeXdEFnlEV3nJQ
function getFeatureUrlLength(url) {
    const urlObj = new URL(url);
    if (urlObj.hostname.length < 54) {
        return -1;
    }
    else if (urlObj.hostname.length >= 54 && urlObj.hostname.length <= 75) {
        return 0;
    }
    else {
        return 1;
    }
}
exports.getFeatureUrlLength = getFeatureUrlLength;
function getFeatureDoubleSlashRedirecting(url) {
    return url.slice(8).includes('//') ? 1 : -1;
}
exports.getFeatureDoubleSlashRedirecting = getFeatureDoubleSlashRedirecting;


/***/ })
/******/ ]);