const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const addButton = document.querySelector(".todo-add");

addButton.addEventListener("click", addTodo);
// 함수 선언식 -> hoisting 가능
// 화살표 함수는 hoisting 안됨

function addTodo() {
    const value = todoInput.value;
    const li = document.createElement("li");
    li.textContent = value;
    todoList.append(li);
    todoInput.value = "";
}