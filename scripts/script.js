'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

let todoData = [],
    storage = localStorage.getItem('memory');


const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function(item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
      '</div>';
    
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    
    const btnTodoCompleted = li.querySelector('.todo-complete'),
          btnTodoRemove = li.querySelector('.todo-remove');

    btnTodoCompleted.addEventListener('click', function() {
      item.completed = !item.completed;
      render();
    });

    btnTodoRemove.addEventListener('click', function(e) {
      let position = todoData.indexOf(item, 0);
      todoData.splice(position, 1);
      render();
    });
  });

  let jsonArr = JSON.stringify(todoData);
  localStorage.setItem('memory', jsonArr);
};

todoControl.addEventListener('submit', function(event) {
  event.preventDefault();

  if (headerInput.value === '') {
    alert('Не могу добавить пустое поле');
  } else {
    const newTodo = {
      value: headerInput.value,
      completed: false,
    };
  
    todoData.push(newTodo);
    headerInput.value = '';
    render();
  }
});

if (storage === null) {
  render();
} else {
  todoData = JSON.parse(storage);
  render();
}
