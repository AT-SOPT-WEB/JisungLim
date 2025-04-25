const STORAGE_KEY_TODOLIST = "todoList";
const STORAGE_KEY_LISTID = "listId";
const todoInput = document.querySelector(".todo-input");
const todoPriority = document.querySelector(".todo-priority");
const addTodoButton = document.querySelector(".addTodo-button");
const completeButton = document.querySelector(".complete-button");
const deleteButton = document.querySelector(".delete-button");
const tableBody = document.querySelector(".table-body")
const modal = document.querySelector(".modal");
const closeModalButton = document.querySelector(".closeModal-button");
const checkedIdSet = new Set(); // 체크한 체크박스의 listId값 저장
const todoList = JSON.parse(localStorage.getItem(STORAGE_KEY_TODOLIST)) || [];

todoList.forEach((todoList, idx) => {
    const tr = document.createElement("tr");

    const checkboxTd = document.createElement("td");
    checkboxTd.className = "table-data"

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.id = todoList.id;
    checkbox.addEventListener("change", (e) => {
        const id = e.target.dataset.id;
        if (e.target.checked) {
            checkedIdSet.add(id);
        } else {
            checkedIdSet.delete(id);
        }
    });

    const priorityTd = createTd(todoList.priority);
    const inputTd = createTd(todoList.title);
    const isCompletedTd = createTd(todoList.completed ? "✅" : "❌");

    checkboxTd.append(checkbox);
    tr.append(checkboxTd, priorityTd, isCompletedTd, inputTd);
    tableBody.append(tr);
})

addTodoButton.addEventListener("click", addTodo); // hoisting(o)
completeButton.addEventListener("click", completeTask);
deleteButton.addEventListener("click", deleteTask);
closeModalButton.addEventListener("click", closeModal);


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

    // 테이블에 추가
    const tr = document.createElement("tr");

    const checkboxTd = document.createElement("td");
    checkboxTd.className = "table-data"

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.id = listId;
    checkbox.addEventListener("change", (e) => {
        const id = e.target.dataset.id;
        if (e.target.checked) {
            checkedIdSet.add(id);
        } else {
            checkedIdSet.delete(id);
        }
    });
    
    const priorityTd = createTd(priorityValue);
    const inputTd = createTd(inputValue);
    const isCompletedTd = createTd("❌");

    checkboxTd.append(checkbox);
    tr.append(checkboxTd, priorityTd, isCompletedTd, inputTd);
    tableBody.append(tr);

    // local storage에 추가
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
    console.log(checkedIdSet)
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