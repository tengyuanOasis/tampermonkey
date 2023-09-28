/** @format */

// ==UserScript==
// @name         Show Google Search Tools
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  https://showGoogleSearchToll/
// @author       June
// @match        https://www.google.com/search?q=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @supportURL   https://raw.githubusercontent.com/tengyuanOasis/tampermonkey/
// @updateURL    https://raw.githubusercontent.com/tengyuanOasis/tampermonkey/main/showGoogleSearchToll.js
// @downloadURL  https://raw.githubusercontent.com/tengyuanOasis/tampermonkey/main/showGoogleSearchToll.js

(function () {
	window.onload = () => {
		document.querySelector('.t2vtad').click();
	};
})();
