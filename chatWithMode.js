/** @format */

// ==UserScript==
// @name         GPT模型输入
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  GPT中文调教模型，通过调教获取更好的gpt体验
// @author       June
// @match        https://chat.openai.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @namespace    https://raw.githubusercontent.com/tengyuanOasis/tampermonkey/
// @supportURL   https://raw.githubusercontent.com/tengyuanOasis/tampermonkey/
// @updateURL    https://raw.githubusercontent.com/tengyuanOasis/tampermonkey/main/chatWithMode.js
// @downloadURL  https://raw.githubusercontent.com/tengyuanOasis/tampermonkey/main/chatWithMode.js
// @grant        none
// ==/UserScript==

const mode = [
	{
		name: '前端开发',
		value:
			'我想让你充当前端开发专家。我将提供一些关于Js、Node等前端代码问题的具体信息，而你的工作就是想出为我解决问题的策略。这可能包括建议代码、代码逻辑思路策略。'
	},
	{
		name: 'uniapp',
		value:
			'我想让你充当前端开发专家。我将提供一些关于vue、Js、uniapp、支付宝小程序、微信小程序的相关问题，而你的工作就是想出为我解决问题的策略。这可能包括建议代码、代码逻辑思路策略。'
	},
	{
		name: '英译中',
		value:
			'下面我让你来充当翻译家，你的目标是把任何语言翻译成中文，请翻译时不要带翻译腔，而是要翻译得自然、流畅和地道，使用优美和高雅的表达方式。'
	},
	{
		name: '中译英',
		value:
			'下面我让你来充当翻译家，你的目标是把中文翻译成英文，请翻译时不要带翻译腔，而是要翻译得自然、流畅和地道，使用优美和高雅的表达方式。'
	},
	{
		name: 'codeif',
		value: '下面我让你来模仿codeif，你的目标是根据我输入的描述或者名字，帮我生成js变量或者函数名。'
	},
	{
		name: 'js异常助手',
		value:
			'我想让你充当全栈开发工程师。我将提供一些关于Js、Node、支付宝及微信小程序等前端代码异常的具体信息，而你的工作就是想出为我解决问题的策略。这可能包括建议代码、代码逻辑思路策略。'
	},
	{
		name: '算法专家',
		value:
			'我想让你充当算法专家。我将提供一些关于Js、Node的一些代码片段，你的工作是通过一些算法或者优化写法，将我提供的代码片段进行优化，达到最佳性能，并对优化方案做出解释。'
	},
	{
		name: '正则表达式',
		value:
			'我希望你充当正则表达式生成器。您的角色是生成匹配文本中特定模式的正则表达式。您应该以一种可以轻松复制并粘贴到支持正则表达式的文本编辑器或编程语言中的格式提供正则表达式。不要写正则表达式如何工作的解释或例子；只需提供正则表达式本身。'
	},
	{
		name: 'StackOverflow',
		value:
			'我想让你充当 stackoverflow 的帖子。我会问与编程相关的问题，你会回答应该是什么答案。我希望你只回答给定的答案，并在不够详细的时候写解释。不要写解释。当我需要用英语告诉你一些事情时，我会把文字放在大括号内{like this}。'
	}
];

const sendMsg = (msg) => {
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
        width:240px;
		position: fixed;
		right: 10px;
		top: 100px;
		box-sizing:border-box;
		padding:20px;
		border-radius: 10px;
        z-index:999;
       	color:#000;
        border-radius: 12px;
        background: #fff;
        box-shadow:  5px 5px 17px #bababa,-5px -5px 17px #ffffff;
	`;

	const str = mode.reduce(
		(pre, cur, cIdx) =>
		(pre += `
			<li style="margin:10px;cursor:pointer;color:#000" onclick="window.sendMsg('${cur.value}')">
				${cIdx + 1}、${cur.name}
			</li>`),
		''
	);
	box.innerHTML = `
    	<div style="font-weight:bold;font-size:20px;cursor:move;">模型输入</div>
    	<ul style="width:100%;max-height:260px;overflow-y:scroll">${str}</ul>
    `;

	document.body.appendChild(box);


	let isDown = false;
	let offsetX, offsetY;

	box.addEventListener('mousedown', (e) => {
		isDown = true;
		offsetX = box.offsetLeft - e.clientX;
		offsetY = box.offsetTop - e.clientY;
	});

	document.addEventListener('mouseup', (e) => {
		isDown = false;
	});

	document.addEventListener('mousemove', (e) => {
		e.preventDefault();
		if (isDown) {
			box.style.left = e.clientX + offsetX + 'px';
			box.style.top = e.clientY + offsetY + 'px';
		}
	});

};

(function () {
	window.sendMsg = sendMsg;
	createBox();
})();