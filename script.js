let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    const sortedTasks = tasks.sort((a, b) => b.id - a.id);
    sortedTasks.forEach(task => {
        if (filter === "completed" && !task.completed) return;
        if (filter === "pending" && task.completed) return;

        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) li.classList.add("complete");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.onclick = function() {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks(filter);
        };

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.className = "complete-button";
        completeButton.onclick = function() {
            task.completed = !task.completed;
            saveTasks();
            renderTasks(filter);
        };

        li.appendChild(deleteButton);
        li.appendChild(completeButton);
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    if (taskInput.value === "") {
        alert("Please enter a task");
        return;
    }
    tasks.push({ id: Date.now(), text: taskInput.value, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
}

function filterTasks(status) {
    renderTasks(status);
}

renderTasks();
