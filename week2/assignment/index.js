const STORAGE_KEY_TODOLIST = "todoList";
const STORAGE_KEY_LISTID = "listId";
const todoInput = document.querySelector(".todo-input");
const todoPriority = document.querySelector(".todo-priority");
const addTodoButton = document.querySelector(".addTodo-button");
const tableBody = document.querySelector(".table-body")
const todoList = JSON.parse(localStorage.getItem(STORAGE_KEY_TODOLIST)) || [];

addTodoButton.addEventListener("click", addTodo); // hoisting(o)

todoList.forEach((todoList, idx) => {
    const tr = document.createElement("tr");
    const checkboxTd = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkboxTd.className = "table-data"
    const priorityTd = createTd(todoList.priority);
    const inputTd = createTd(todoList.title);
    const isCompletedTd = createTd(todoList.completed ? "✅" : "❌");

    checkboxTd.append(checkbox);
    tr.append(checkboxTd, priorityTd, isCompletedTd, inputTd);
    tableBody.append(tr);
})

function addTodo() {
    const inputValue = todoInput.value.trim();
    const priorityValue = todoPriority.value;

    if (!inputValue || priorityValue == "") {
        alert("할 일과 중요도 모두 입력해주세요!");
        return;
    }

    // 테이블에 추가
    const tr = document.createElement("tr");
    const checkboxTd = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkboxTd.className = "table-data"
    const priorityTd = createTd(priorityValue);
    const inputTd = createTd(inputValue);
    const isCompletedTd = createTd("❌");

    checkboxTd.append(checkbox);
    tr.append(checkboxTd, priorityTd, isCompletedTd, inputTd);
    tableBody.append(tr);

    // local storage에 추가
    let listId = Number(localStorage.getItem(STORAGE_KEY_LISTID) || 0);
    const todo = {
        "id": listId, 
        "title": inputValue, 
        "completed": false, 
        "priority": priorityValue
    };
    todoList.push(todo);
    localStorage.setItem(STORAGE_KEY_TODOLIST, JSON.stringify(todoList));
    localStorage.setItem(STORAGE_KEY_LISTID, ++listId);

    // 입력 초기화
    todoInput.value = "";
    todoPriority.value = "";
    todoInput.focus();
}

function createTd(text) {
    const td = document.createElement("td");
    td.textContent = text;
    td.className = "table-data";
    return td;
}