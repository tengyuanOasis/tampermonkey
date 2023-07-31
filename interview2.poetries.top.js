/** @format */

// ==UserScript==
// @name         前端面试指南内容破解
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  https://interview.poetries.top/ 网站限制内容破解
// @author       You
// @match         *://*.poetries.top/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @namespace    https://raw.githubusercontent.com/tengyuanOasis/tampermonkey_scripts/
// @supportURL   https://raw.githubusercontent.com/tengyuanOasis/tampermonkey_scripts/
// @updateURL    https://raw.githubusercontent.com/tengyuanOasis/tampermonkey_scripts/main/interview2.poetries.top.js
// @downloadURL  https://raw.githubusercontent.com/tengyuanOasis/tampermonkey_scripts/main/interview2.poetries.top.js
// @grant        none
// ==/UserScript==

window.onload = function () {
	'use strict';

	const _this = document.querySelector('#app').__vue__;

	const isDOM =
		typeof HTMLElement === 'object'
			? function (obj) {
					return obj instanceof HTMLElement;
			  }
			: function (obj) {
					return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
			  };

	const getDisplay = (dom) => {
		return dom.currentStyle ? dom.currentStyle : window.getComputedStyle(dom, null).display;
	};

	const delMore = () => {
		const more = document.querySelector('.readMore-wrapper');
		more.remove();
		console.log('已删除【更多】按钮');
	};

	const showDisplayDom = () => {
		let list = document.querySelector('.content__default');
		console.log('list', list);
		list.childNodes.forEach((dom) => {
			if (isDOM(dom)) {
				if (getDisplay(dom) === 'none') {
					dom.style.display = 'revert';
				}
				dom.style.opacity = '1';
			}
		});
		//调用vue实例上的element组件
		_this.$notify({
			title: 'Notice!!!🧐🧐',
			message: '已显示文档隐藏内容',
			type: 'success'
		});
	};

	const insertBtn = () => {
		let rightToolbar = document.querySelector('.location');
		let hacker = document.createElement('button');
		hacker.style.marginBottom = '20px';
		hacker.classList.add('el-button', 'el-button--danger', 'is-circle', 'el-icon-magic-stick', 'el-tooltip');
		hacker.onclick = () => showDisplayDom();
		rightToolbar.insertBefore(hacker, rightToolbar.firstChild);
	};

	setTimeout(() => {
		delMore();
		showDisplayDom();
		_this.$loading = false;
	}, 2000);

	insertBtn();
};
