document.addEventListener("DOMContentLoaded", ()=> {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if(storedTasks){
        storedTasks.forEach((task)=> tasks.push(task))
        updateTasksList();
    }
});

let tasks = [];

const saveTasks = ()=> {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ''; 
        updateTasksList();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;
    deleteTask(index); 
    saveTasks();
};

const updateTasksList = () => {
    const taskList = document.querySelector('.task-list'); 
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="taskItem">
          <div class="task ${task.completed ? 'completed' : ''}">
           <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
           <p>${task.text}</p>
          </div>
          <div class="icons">
           <i class="fas fa-edit" onClick="editTask(${index})" style="cursor: pointer; margin-right: 10px;"></i>
           <i class="fas fa-trash" onClick="deleteTask(${index})" style="cursor: pointer; color: red;"></i>
          </div>
         </div>  
        `;

        
        const checkbox = listItem.querySelector('.checkbox');
        checkbox.addEventListener('change', () => toggleTaskComplete(index));
        taskList.append(listItem);
    });

    
    updateProgress();
};

const updateProgress = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = document.getElementById('progress');
    const numbers = document.getElementById('numbers');

    
    numbers.textContent = `${completedTasks}/${totalTasks}`;

    
    let progressPercentage = 0;

    if (totalTasks === 0) {
        progressPercentage = 100; 
    } else {
        progressPercentage = (completedTasks / totalTasks) * 100;
    }

    progress.style.width = `${progressPercentage}%`;
};


document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});
