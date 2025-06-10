const pageContainer = document.getElementById("page-container");
const taskForm = document.querySelector('#task-input');
const todoList = document.getElementById("todo-list");
const todoItem = document.querySelector(".todo-item");
const addTask = document.getElementById('addTaskBtn');
const completedTasks = document.querySelector("completed-tasks");
const taskNameInput = document.getElementById('task-name');
const taskDescInput = document.getElementById('task-desc');
const taskTimeInput = document.getElementById('time-spent');
const clearTaskBttn = document.getElementById('clearTaskBtn');
const closeBttn = document.getElementById('saveButton')

let taskList = []; 
let completedList = [];
const storageKey = "TASKS";

function addNewTask() {
    const taskName = taskNameInput.value;
    const taskDesc = taskDescInput.value;
    const taskTime = taskTimeInput.value;
    // add a boolean to indicate whether task is completed

    taskList.push([taskName,taskDesc,taskTime]);
    renderList();
    // Save to local storage
    saveListData();

    // Reset and close form
    taskForm.classList.remove('active');
    taskName.value = "";
    taskDesc.value = "";
    taskTime.value = "";
};

addTask.addEventListener('click', () => {
    taskForm.classList.add('active');
});

// Clear all tasks from storage
function clearItems() {
    list = [];
    localStorage.removeItem(storageKey);
    renderList();
}
// Clear All Tasks and Empty Storage;
clearTaskBttn.addEventListener('click', clearItems());

// Hide the form when closed
closeBttn.addEventListener('click', () => {
    taskForm.classList.remove('active');
})

// Form Submission
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addNewTask();
});

function saveListData() {
    localStorage.setItem(storageKey, JSON.stringify(taskList))
}

function loadListData() {
    const storedListData = localStorage.getItem(storageKey);
    if (storedListData) {
        list = JSON.parse(storedListData);
        renderList();
    }
}

function renderList() {
    todoList.innerHTML = ''; // Clear current content
    taskList.forEach(([taskName,taskDesc,taskTime]) => {
        const newTask = document.createElement('div');
        newTask.classList.add('task');
        newTask.innerHTML = `
            <h5 class="title">${taskName}</h5>
            <div class="task-container">
                <button type="radio" id="toggle-visible"></button>
                <div class="reps">${taskTime}</div>
                <div class="description">${taskDesc}</div>
            </div>
        `;
        todoList.appendChild(newTask);
        pageContainer.appendChild(todoList);
    })
    const addTaskDiv = document.createElement('div');
    addTaskDiv.classList.add('task');
    addTaskDiv.id = 'addTask';
    const addTaskBtn = document.createElement('button');
    const clearTaskBtn = document.createElement('button');
    addTaskBtn.id = 'addTaskBtn';
    clearTaskBtn.id = 'clearTaskBtn';
    clearTaskBtn.innerHTML = 'Clear All Tasks';
    addTaskBtn.innerHTML = 'Add New Task';
    clearTaskBtn.addEventListener('click', () => clearItems());
    addTaskBtn.addEventListener('click', () => {taskForm.classList.add('active');});
    addTaskDiv.appendChild(addTaskBtn);
    addTaskBtn.appendChild(clearTaskBtn);
    todoList.appendChild(addTaskDiv);
}

// Maybe the completed / uncompleted radio button becomes a counter
    // When finished with 1 rep, lower counter
    // If counter reaches 0, move item to completed tasks