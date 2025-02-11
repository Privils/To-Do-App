document.addEventListener("DOMContentLoaded", () => {
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskTitleInput = document.getElementById("task-title");
    const taskContentInput = document.getElementById("task-content");
    const taskList = document.getElementById("task-list");

    // Automatically generate or retrieve user ID
    const getUserId = () => {
        let userId = localStorage.getItem("userId");

        if (!userId) {
            userId = Math.floor(Math.random() * 1000000);
            localStorage.setItem("userId", userId);
        }

        document.querySelector(".userId").textContent = `User ID: ${userId}`;
        return parseInt(userId, 10);
    };

    // Retrieve tasks from localStorage
    const fetchTasks = () => {
        const userId = getUserId();
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        const userTasks = tasks.filter(task => task.userId === userId);

        taskList.innerHTML = "";
        userTasks.forEach(todo => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${todo.title}</strong>: ${todo.description}
                <button onclick="deleteTask(${todo.id})">Delete</button>`;
            taskList.appendChild(li);
        });
    };

    // Add task to localStorage
    const addTask = (event) => {
        event.preventDefault();
        const title = taskTitleInput.value.trim();
        const description = taskContentInput.value.trim();
        const userId = getUserId();

        if (!title || !description) {
            alert("Please enter task details.");
            return;
        }

        const newTask = {
            id: Date.now(), // Use timestamp as task ID
            title,
            description,
            userId
        };

        // Get existing tasks from localStorage, or initialize an empty array if none exist
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(newTask);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        fetchTasks();
        taskTitleInput.value = "";
        taskContentInput.value = "";
    };

    // Delete task from localStorage
    window.deleteTask = (id) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks = tasks.filter(task => task.id !== id);

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        fetchTasks();
    };

    addTaskBtn.addEventListener("click", addTask);
    fetchTasks();
});
