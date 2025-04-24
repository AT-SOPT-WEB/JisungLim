const input = document.querySelector('.todo-input');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');

// 처음 로드 시 local storage로부터 값 가져옴
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 초기화하고 화면에 표시
todos.forEach((todos) => {
    const li = document.createElement('li');
    li.textContent = todos
    todoList.appendChild(li);
})

// 리스트에 추가
addBtn.addEventListener('click', () => {
    // input값 가져오기
    const value = input.value;

    if (!value) return;

    // li태그 생성 및 input값 넣고 todoList에 추가
    const li = document.createElement('li');
    li.textContent = value;
    todoList.appendChild(li);

    // local storage에 저장
    todos.push(value);
    localStorage.setItem('todos', JSON.stringify(todos));

    input.value = '';
})
