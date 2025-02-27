/** @format */

// ==UserScript==
// @name         GPT输入提示
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  GPT中文提示，通过调教获取更好的gpt体验
// @author       June
// @match        *://chat.openai.com
// @match        *://chatgpt.com/*
// @match        *://chat.openai.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @namespace    https://raw.githubusercontent.com/tengyuanOasis/tampermonkey/
// @supportURL   https://raw.githubusercontent.com/tengyuanOasis/tampermonkey/
// @updateURL    https://raw.githubusercontent.com/tengyuanOasis/tampermonkey/main/chatWithPrompt.js
// @downloadURL  https://raw.githubusercontent.com/tengyuanOasis/tampermonkey/main/chatWithPrompt.js
// @grant        none
// ==/UserScript==

class PromptBox {
  constructor() {
    this.promptList = [
      {
        act: '前端开发',
        prompt:
          '我想让你充当前端开发专家。我将提供一些关于Js、Ts、Node、vue、React、uniapp、支付宝小程序、微信小程序等前端代码问题的具体信息，而你的工作就是想出为我解决问题的策略。这可能包括： 1、建议代码、代码优化、代码逻辑思路策略；2、根据我提供的问题场景给我合适的技术建议，如果我提供的信息不足你需要主动发问，了解问题场景再做解答；3、提供优化后的完整的没有省略的代码片段；4、前端常用库的使用方法使用示例等等。现在我的第一个问题是，你准备好了吗'
      },
      {
        act: 'js异常助手',
        prompt:
          '我想让你充当全栈开发工程师。我将提供一些关于Js、Node、支付宝及微信小程序等前端代码异常的具体信息，而你的工作就是想出为我解决问题的策略。这可能包括建议代码、代码逻辑思路策略。'
      },
      {
        act: '算法专家',
        prompt:
          '我想让你充当算法专家。我将提供一些关于Js、Node的一些代码片段，你的工作是通过一些算法或者优化写法，将我提供的代码片段进行优化，达到最佳性能，并对优化方案做出解释。'
      },
      {
        act: '正则表达式',
        prompt:
          '我希望你充当正则表达式生成器。您的角色是生成匹配文本中特定模式的正则表达式。您应该以一种可以轻松复制并粘贴到支持正则表达式的文本编辑器或编程语言中的格式提供正则表达式。不要写正则表达式如何工作的解释或例子；只需提供正则表达式本身。'
      },
      {
        act: '英译中',
        prompt:
          '下面我让你来充当翻译家，你的目标是把任何语言翻译成中文，请翻译时不要带翻译腔，而是要翻译得自然、流畅和地道，使用优美和高雅的表达方式。'
      },
      {
        act: '中译英',
        prompt:
          '下面我让你来充当翻译家，你的目标是把中文翻译成英文，请翻译时不要带翻译腔，而是要翻译得自然、流畅和地道，使用优美和高雅的表达方式。'
      },
      {
        act: '一个歪果仁',
        prompt:
          '下面我让你来充当一名母语英语的美国人，你的职责就是用英文跟我聊天，你需要根据聊天内容寻找话题，我聊一些日常常用语句，不要有翻译腔，训练我日常用语口语以为英文阅读能力，如果我的单词拼写错了或者语法用的不对，我希望你可以纠正我的错误，向我提供一些建议，并继续聊天，如果你准备好了就向我打个招呼吧，我的名字是mark。'
      },
      {
        act: 'codeif',
        prompt:
          '下面我让你来模仿codeif，你的目标是根据我输入的描述或者名字，帮我生成js变量或者函数名。'
      },
      {
        act: 'StackOverflow',
        prompt:
          '我想让你充当 stackoverflow 的帖子。我会问与编程相关的问题，你会回答应该是什么答案。我希望你只回答给定的答案，并在不够详细的时候写解释。不要写解释。当我需要用英语告诉你一些事情时，我会把文字放在大括号内{like this}。'
      },
      {
        act: '代码解释器',
        prompt:
          '我想让你充当资深开发工程师，我将提供给你一些js、node、vue或react的代码片段，你的工作是通过代码片段分析出这段代码的作用，并给出每段逻辑的作用'
      },
      {
        act: 'IT专家',
        prompt:
          '我希望你充当 IT 专家。我会向您提供有关我的技术问题所需的所有信息，而您的职责是解决我的问题。你应该使用你的项目管理知识，敏捷开发知识来解决我的问题。在您的回答中使用适合所有级别的人的智能、简单和易于理解的语言将很有帮助。用要点逐步解释您的解决方案很有帮助。我希望您回复解决方案，而不是写任何解释'
      }
    ]
    this.box = this.createBox()
    this.attachEventHandlers()
  }

  sendMsg(msg) {
    document.querySelector('#prompt-textarea').firstChild.innerHTML = msg
    setTimeout(() => document.querySelector('.me-1').firstChild.click(), 0)
    // t.value = msg
    // t.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }))
    // setTimeout(() => t.nextElementSibling.click(), 0)
  }

  createBox() {
    const box = document.createElement('div')

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
		`

    const str = this.promptList
      .map(
        (cur, cIdx) => `
			     <li style="cursor:pointer;color:#000;padding:8px;border-radius:10px;">
				    ${cIdx + 1}、${cur.act}
			     </li>`
      )
      .join('')

    box.innerHTML = `
			<div style="font-weight:bold;font-size:20px;cursor:move;margin-bottom:10px">输入提示</div>
			<ul style="width:100%;max-height:260px;overflow-y:scroll">${str}</ul>
		`

    document.body.appendChild(box)
    return box
  }
  attachEventHandlers() {
    let isDown = false
    let offsetX, offsetY

    this.box.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        const index = Array.from(e.target.parentNode.children).indexOf(e.target)
        const prompt = this.promptList[index].prompt
        this.sendMsg(prompt)
      }
    })

    this.box.addEventListener('mousedown', (e) => {
      isDown = true
      offsetX = this.box.offsetLeft - e.clientX
      offsetY = this.box.offsetTop - e.clientY
    })

    this.box.addEventListener('mouseup', () => {
      isDown = false
    })

    this.box.addEventListener('mousemove', (e) => {
      e.preventDefault()
      if (isDown) {
        this.box.style.left = `${e.clientX + offsetX}px`
        this.box.style.top = `${e.clientY + offsetY}px`
      }
    })
    this.box.addEventListener('mouseover', (e) => {
      if (e.target.tagName === 'LI') {
        e.target.style.background = '#efefef'
      }
    })

    this.box.addEventListener('mouseout', (e) => {
      if (e.target.tagName === 'LI') {
        e.target.style.background = '#fff'
      }
    })
  }
}

;(() => {
  setTimeout(() => {
    new PromptBox()
  }, 1000)
})()
