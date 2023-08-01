/** @format */

// ==UserScript==
// @name         前端面试指南内容破解
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  https://interview.poetries.top/ 网站限制内容破解
// @author       June
// @match         *://*.poetries.top/*
// @namespace    https://raw.githubusercontent.com/tengyuanOasis/tampermonkey/
// @supportURL   https://raw.githubusercontent.com/tengyuanOasis/tampermonkey/
// @updateURL    https://raw.githubusercontent.com/tengyuanOasis/tampermonkey/main/interview2.poetries.top.js
// @downloadURL  https://raw.githubusercontent.com/tengyuanOasis/tampermonkey/main/interview2.poetries.top.js
// @icon         data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cup-hot" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M.5 6a.5.5 0 0 0-.488.608l1.652 7.434A2.5 2.5 0 0 0 4.104 16h5.792a2.5 2.5 0 0 0 2.44-1.958l.131-.59a3 3 0 0 0 1.3-5.854l.221-.99A.5.5 0 0 0 13.5 6H.5ZM13 12.5a2.01 2.01 0 0 1-.316-.025l.867-3.898A2.001 2.001 0 0 1 13 12.5ZM2.64 13.825 1.123 7h11.754l-1.517 6.825A1.5 1.5 0 0 1 9.896 15H4.104a1.5 1.5 0 0 1-1.464-1.175Z"/><path d="m4.4.8-.003.004-.014.019a4.167 4.167 0 0 0-.204.31 2.327 2.327 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.31 3.31 0 0 1-.202.388 5.444 5.444 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 3.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 3.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 3 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 4.4.8Zm3 0-.003.004-.014.019a4.167 4.167 0 0 0-.204.31 2.327 2.327 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.31 3.31 0 0 1-.202.388 5.444 5.444 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 6.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 6.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 6 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 7.4.8Zm3 0-.003.004-.014.019a4.077 4.077 0 0 0-.204.31 2.337 2.337 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.198 3.198 0 0 1-.202.388 5.385 5.385 0 0 1-.252.382l-.019.025-.005.008-.002.002A.5.5 0 0 1 9.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 9.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 9 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 10.4.8Z"/></svg>
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
