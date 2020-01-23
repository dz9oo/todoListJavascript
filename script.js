
let taskText = document.querySelector("#taskText");
let tasks = document.querySelector("#tasks");
let store = localStorage;
let itemStorage = [];

window.onload = () => {
    itemStorage = store.getItem("_task_");
    if (itemStorage) {
        itemStorage = itemStorage.split(",");
        itemStorage.forEach(element => {
            tasks.appendChild(createTaskNode(element));
        });
    } else {
        itemStorage = [];
    }
};

let addTaskToStorage = (task) => {
    itemStorage.push(task);
    store.setItem("_task_", itemStorage);
};

let deleteTaskToStorage = (searchTask) => {
    let taskIndex = itemStorage.findIndex(element => element === searchTask);
    itemStorage.splice(taskIndex, 1);
    store.setItem("_task_", itemStorage);
};


taskText.addEventListener("keyup", (e) => {
    // If ENTER key is pressed:
    if (e.keyCode === 13 && taskText.value) {

        tasks.appendChild(createTaskNode(taskText.value));
        addTaskToStorage(taskText.value);
        taskText.value = "";
    }
});

tasks.addEventListener("click", (e) => {
    let elem = e.target;

    if (elem.classList.contains("todo-remove")) {
        let taskToDelete = elem.previousElementSibling.innerText;
        deleteTaskToStorage(taskToDelete);
        console.log(`Tache à supprimer : ${taskToDelete}`);
        elem.parentNode.remove();
    }

    if (elem.classList.contains('todo-task')) {
        elem.classList.toggle('todo-done');
    }
});

let createTaskNode = (txt) => {
    let textTask = document.createTextNode(txt);
    let spanTask = document.createElement("span");
    spanTask.appendChild(textTask);
    spanTask.classList.add("todo-task");

    let trash = document.createTextNode("\u{1F5D1}");
    let spanTrash = document.createElement("span");
    spanTrash.appendChild(trash);
    spanTrash.classList.add("todo-remove");

    let li = document.createElement("li");
    li.appendChild(spanTask);
    li.appendChild(spanTrash);

    return li;
};

