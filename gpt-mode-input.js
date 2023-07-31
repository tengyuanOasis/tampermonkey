/** @format */

// ==UserScript==
// @name         GPT模型输入
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       JuneTeng Ma
// @match        https://chat.openai.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @grant        none
// ==/UserScript==

const mode = [
	{
		name: '前端开发',
		value: '我想让你充当前端开发专家。我将提供一些关于Js、Node等前端代码问题的具体信息，而你的工作就是想出为我解决问题的策略。这可能包括建议代码、代码逻辑思路策略。'
	},
	{
		name: 'uniapp',
		value:
			'我想让你充当前端开发专家。我将提供一些关于vue、Js、uniapp、支付宝小程序、微信小程序的相关问题，而你的工作就是想出为我解决问题的策略。这可能包括建议代码、代码逻辑思路策略。'
	},
	{ name: '充当英翻中', value: '下面我让你来充当翻译家，你的目标是把任何语言翻译成中文，请翻译时不要带翻译腔，而是要翻译得自然、流畅和地道，使用优美和高雅的表达方式。' },
	{ name: 'codeif', value: '下面我让你来模仿codeif，你的目标是根据我输入的描述或者名字，帮我生成js变量或者函数名。' },
	{
		name: 'js异常助手',
		value:
			'我想让你充当全栈开发工程师。我将提供一些关于Js、Node、支付宝及微信小程序等前端代码异常的具体信息，而你的工作就是想出为我解决问题的策略。这可能包括建议代码、代码逻辑思路策略。'
	},
	{
		name: '算法专家',
		value: '我想让你充当算法专家。我将提供一些关于Js、Node的一些代码片段，你的工作是通过一些算法或者优化写法，将我提供的代码片段进行优化，达到最佳性能，并对优化方案做出解释。'
	}
];

const sendMsg = (msg) => {
	console.log('msg', msg);
	let t = document.querySelector('#prompt-textarea');
	let evt = document.createEvent('HTMLEvents');
	evt.initEvent('input', true, true);
	t.value = msg;
	t.dispatchEvent(evt);
	setTimeout(() => {
		t.nextElementSibling.click();
	});
};

const createBox = () => {
	let box = document.createElement('div');
	box.style.cssText = `
				background: #fff;
				position: fixed;
				right: 10px;
				top: 100px;
				box-sizing:border-box;
				padding:20px;
				border-radius: 10px;
                z-index:999;
                color:#000;
		`;
	const str = mode.reduce((pre, cur) => (pre += `<li style="margin:10px;cursor:pointer;color:#000" onclick="window.sendMsg('${cur.value}')">${cur.name}</li>`), '');
	box.innerHTML = `
    <div style="font-weight:bold;font-size:20;magin:10px">模型输入</div>
    <ul>${str}</ul>`;
	document.body.appendChild(box);
	console.log(box);
	document.body.appendChild(box);
};

(function () {
	'use strict';
	window.sendMsg = sendMsg;
	createBox();
})();
