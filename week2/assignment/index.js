import { todoData } from "./todoData.js"
const STORAGE_KEY_TODOLIST = "todoList";
const STORAGE_KEY_LISTID = "listId";
const filterButtons = document.querySelectorAll(".filter");
const todoInput = document.querySelector(".todo-input");
const todoPriority = document.querySelector(".todo-priority");
const addTodoButton = document.querySelector(".addTodo-button");
const completeButton = document.querySelector(".complete-button");
const deleteButton = document.querySelector(".delete-button");
const selectAllButton = document.querySelector(".select-all");
const tableBody = document.querySelector(".table-body");
const modal = document.querySelector(".modal");
const closeModalButton = document.querySelector(".closeModal-button");
const checkedIdSet = new Set(); // 체크한 체크박스의 listId값 저장

const todoList = initializeTodoList();

// event listener 추가
filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const filterType = e.target.dataset.filter;
        filterTodoList(filterType);
    })
})
addTodoButton.addEventListener("click", addTodo); // hoisting(o)
completeButton.addEventListener("click", completeTask);
deleteButton.addEventListener("click", deleteTask);
closeModalButton.addEventListener("click", closeModal);
selectAllButton.addEventListener("click", selectAllCheckbox);

function initializeTodoList() {
    let todoList = JSON.parse(localStorage.getItem(STORAGE_KEY_TODOLIST));
    // localStorage: 모든 데이터 문자열로 저장
    // JSON.parse: 저장된 문자열을 객체/배열로 바꿔줌

    // localStorage에 데이터가 없거나 비어있으면 초기 데이터(todoData)로 세팅
    if (!todoList || todoList.length === 0) {
        todoList = [...todoData];
        localStorage.setItem(STORAGE_KEY_TODOLIST, JSON.stringify(todoList));
        localStorage.setItem(STORAGE_KEY_LISTID, todoList.length + 1);
    }

    todoList.forEach((todo) => {
        createTable(todo);
    });

    return todoList;
}

// 테이블 row 생성 메서드
function createTable(todo) { // todo: {id, title, complete, priority}
    const tr = document.createElement("tr");

    const checkboxTd = document.createElement("td");
    checkboxTd.className = "table-data";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.id = todo.id;
    checkbox.addEventListener("change", (e) => {
        const id = e.target.dataset.id;
        if (e.target.checked) {
            checkedIdSet.add(id);
        } else {
            checkedIdSet.delete(id);
        }
    });

    const priorityTd = createTd(todo.priority);
    const inputTd = createTd(todo.title);
    const isCompletedTd = createTd(todo.completed ? "✅" : "❌");

    checkboxTd.append(checkbox);
    tr.append(checkboxTd, priorityTd, isCompletedTd, inputTd);
    tableBody.append(tr);
}

// 모든 checkbox 선택
function selectAllCheckbox() {
    const allCheckboxes = tableBody.querySelectorAll("input[type=checkbox");

    if (selectAllButton.checked) {
        allCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
            checkedIdSet.add(checkbox.dataset.id);
        })
    } else {
        allCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkedIdSet.delete(checkbox.dataset.id);
        });
    }
}

// todo list 필터링
function filterTodoList(selectedFilter) {
    let filteredList = [];

    if (selectedFilter === "all") {
        filteredList = todoList;
    } else if (selectedFilter === "complete") {
        filteredList = todoList.filter((todo) => todo.completed);
    } else if (selectedFilter === "incomplete") {
        filteredList = todoList.filter((todo) => !todo.completed);
    } else {
        console.warn("알 수 없는 filter");
        return;
    }
    
    tableBody.innerHTML = "";
    filteredList.forEach((todo) => createTable(todo));
}

function createTd(text) {
    const td = document.createElement("td");
    td.textContent = text;
    td.className = "table-data";
    return td;
}

function addTodo() {
    const inputValue = todoInput.value.trim();
    const priorityValue = todoPriority.value;
    let listId = Number(localStorage.getItem(STORAGE_KEY_LISTID) || 0);

    if (!inputValue || priorityValue == "") {
        alert("할 일과 중요도 모두 입력해주세요!");
        return;
    }

    const todo = {
        "id": listId, 
        "title": inputValue, 
        "completed": false, 
        "priority": priorityValue
    };

    // 테이블에 추가
    createTable(todo);

    // local storage에 추가
    todoList.push(todo);
    localStorage.setItem(STORAGE_KEY_TODOLIST, JSON.stringify(todoList));
    localStorage.setItem(STORAGE_KEY_LISTID, ++listId);

    // 입력 초기화
    todoInput.value = "";
    todoPriority.value = "";
    todoInput.focus();
}

function completeTask() {
    // checkedIdSet.forEach((id) => {
    //     const todo = todoList.find((todo) => {
    //         return todo.id === Number(id)
    //     });
    //     if (todo) {
    //         if (todo.completed === true) {
    //             alert("이미 완료된 작업이 포함돼있습니다");
    //             return;
                   // forEach는 '콜백함수' 호출이므로 return 시 해당 콜백이 종료됨
                   // completeTask()가 종료되는게 아님
    //         } else {
    //             todo.completed = true;
    //         }
    //     }
    // });

    for (const id of checkedIdSet) {
        const todo = todoList.find((todo) => {
            return todo.id === Number(id);
        });
        if (todo) {
            if (todo.completed === true) {
                showModal();
                return;
                // for...of는 진짜 그냥 '반복문'이므로 return 시 함수 전체가 반환됨
            } else {
                todo.completed = true;
            }
        }
    }

    localStorage.setItem(STORAGE_KEY_TODOLIST, JSON.stringify(todoList));
    location.reload(); // checkedIdSet 초기화
}

function deleteTask() {
    for (const id of checkedIdSet) {
        const index = todoList.findIndex((todo) => {
            return todo.id === Number(id);
            // 조건 만족 첫번째 index(number) 반환, 없으면 -1 반환
        })
        if (index !== -1) {
            todoList.splice(index, 1); // index부터 n개의 요소 삭제
        }
    }

    localStorage.setItem(STORAGE_KEY_TODOLIST, JSON.stringify(todoList));
    location.reload();
}

function showModal() {
    modal.classList.remove("hidden");
}

function closeModal() {
    modal.classList.add("hidden");
}