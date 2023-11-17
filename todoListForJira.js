/** @format */

// ==UserScript==
// @name         TodoList for 172.29.3.241
// @namespace    todoListForJira
// @version      0.8
// @description  Add a movable TodoList to http://172.29.3.241/browse/
// @author       June
// @match        http://172.29.3.241/browse/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @namespace    https://raw.githubusercontent.com/tengyuanOasis/tampermonkey/
// @supportURL   https://raw.githubusercontent.com/tengyuanOasis/tampermonkey/
// @updateURL    https://raw.githubusercontent.com/tengyuanOasis/tampermonkey/main/todoListForJira.js
// @downloadURL  https://raw.githubusercontent.com/tengyuanOasis/tampermonkey/main/todoListForJira.js
// @grant        none
// ==/UserScript==

class TodoList {
	constructor() {
		this.todoListContainer = this.createTodoListContainer();
		this.todoItemsContainer = this.createTodoItemsContainer();
		this.newTodoInput = this.createNewTodoInput();
		this.addTodoBtn = this.createAddTodoButton();
		this.storedTodos = JSON.parse(localStorage.getItem('todos')) || [];

		this.initTodoList();
		this.makeTodoListDraggable();
	}

	createTodoListContainer() {
		const container = document.createElement('div');
		container.id = 'todoListContainer';
		container.style.cssText = `
      width: 300px;
      height: auto;
      position: fixed;
      top: 10px;
      right: 10px;
      box-sizing: border-box;
      padding: 20px;
      border-radius: 12px;
      z-index: 999;
      color: #000;
      background: #fff;
      box-shadow: 5px 5px 17px #bababa, -5px -5px 17px #ffffff;
    `;
		document.body.appendChild(container);
		return container;
	}

	createTodoItemsContainer() {
		const container = document.createElement('ul');
		container.id = 'todoItems';
		container.style.cssText = `
      list-style: none;
      padding: 0;
    `;
		this.todoListContainer.appendChild(container);
		return container;
	}

	createNewTodoInput() {
		const input = document.createElement('input');
		input.id = 'newTodo';
		input.type = 'text';
		input.placeholder = 'Add a new todo';
		input.style.cssText = `
      width: 68%;
      margin-top: 10px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    `;
		this.todoListContainer.appendChild(input);
		return input;
	}

	createAddTodoButton() {
		const button = document.createElement('button');
		button.id = 'addTodoBtn';
		button.textContent = 'Add';
		button.style.cssText = `
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 10px;
      cursor: pointer;
      border-radius: 4px;
      font-size: 14px;
      margin-top: 10px;
      margin-left: 10px;
    `;
		this.todoListContainer.appendChild(button);
		return button;
	}

	initTodoList() {
		this.renderTodos();
		this.addTodoBtn.addEventListener('click', () => this.addTodo());
	}

	renderTodos() {
		this.todoItemsContainer.innerHTML =
			'<div style="font-weight:bold;font-size:20px;cursor:move;">TODO</div>';
		this.storedTodos.forEach((todo, index) => {
			const todoItem = document.createElement('li');
			todoItem.innerHTML = `
        <span class="todoText" style="padding: 8px; cursor: pointer;">${index + 1}、${todo}</span>
        <span class="editBtn" style="margin-left: 8px; cursor: pointer; font-size: 14px;">📝</span>
        <span class="deleteBtn" style="margin-left: 8px; cursor: pointer; font-size: 14px;">❎</span>
      `;
			this.todoItemsContainer.appendChild(todoItem);

			const editBtn = todoItem.querySelector('.editBtn');
			const deleteBtn = todoItem.querySelector('.deleteBtn');
			const todoText = todoItem.querySelector('.todoText');

			editBtn.addEventListener('click', (event) => {
				event.stopPropagation();
				this.editTodo(index, todo);
			});

			deleteBtn.addEventListener('click', (event) => {
				event.stopPropagation();
				this.deleteTodoItem(index);
			});

			todoItem.addEventListener('click', () => this.handleTodoItemClick(todo, index));
		});
	}

	addTodo() {
		const newTodo = this.newTodoInput.value.trim();
		if (newTodo !== '') {
			this.storedTodos.push(newTodo);
			localStorage.setItem('todos', JSON.stringify(this.storedTodos));
			this.renderTodos();
			this.newTodoInput.value = '';
		}
	}

	handleTodoItemClick(todo, index) {
		const quickSearchInput = document.getElementById('quickSearchInput');
		if (quickSearchInput) {
			const newUrl = `http://172.29.3.241/browse/${todo}`;
			window.location.href = newUrl;
		}
	}

	editTodo(index, todo) {
		const editedTodo = prompt('Edit todo:', todo);
		if (editedTodo !== null) {
			this.storedTodos[index] = editedTodo;
			localStorage.setItem('todos', JSON.stringify(this.storedTodos));
			this.renderTodos();
		}
	}

	deleteTodoItem(index) {
		this.storedTodos.splice(index, 1);
		localStorage.setItem('todos', JSON.stringify(this.storedTodos));
		this.renderTodos();
	}

	makeTodoListDraggable() {
		let isDragging = false;
		let offsetX, offsetY;

		this.todoListContainer.addEventListener('mousedown', (e) => {
			isDragging = true;
			offsetX = e.clientX - this.todoListContainer.getBoundingClientRect().left;
			offsetY = e.clientY - this.todoListContainer.getBoundingClientRect().top;
		});

		document.addEventListener('mousemove', (e) => {
			if (isDragging) {
				const x = e.clientX - offsetX;
				const y = e.clientY - offsetY;
				this.todoListContainer.style.left = `${x}px`;
				this.todoListContainer.style.top = `${y}px`;
			}
		});

		document.addEventListener('mouseup', () => {
			isDragging = false;
		});
	}
}

(() => {
	new TodoList();
})();
