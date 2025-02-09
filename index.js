document.addEventListener("DOMContentLoaded", async () => {
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskTitleInput = document.getElementById("task-title");
    const taskContentInput = document.getElementById("task-content");
    const taskList = document.getElementById("task-list");
    
    // Set your live API URL or IP address here
   // const apiUrl = 'http://localhost:4000/api/tasks'; // Change to your actual backend URL (e.g., http://example.com or local IP like http://192.168.x.x)
   const apiUrl = "http://192.168.8.104:4000/api/tasks";

    // Generate or retrieve user ID from Local Storage
    const getUserId = async () => {
        let userId = localStorage.getItem("userId");

        if (!userId) {
            userId = Math.floor(Math.random() * 1000000); // Generate numeric ID
            localStorage.setItem("userId", userId);

            // Create user in the database (only if the user doesn't exist)
            const userExists = await checkUserExists(userId);
            if (!userExists) {
                await fetch("http://localhost:4000/api/users", {  // Make sure to update the URL to your backend in production
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: userId }),
                });
            }
        }

        const pUserId = document.querySelector(".userId");
        pUserId.textContent = `user-Id: ${userId}`;
        console.log(userId);
        return parseInt(userId, 10);
    };

    // Check if the user already exists in the database
    const checkUserExists = async (userId) => {
        const response = await fetch(`http://localhost:4000/api/users/${userId}`);  // Update URL for production
        const data = await response.json();
        return data.length > 0;
    };

    const userId = await getUserId();

    // Fetch tasks for the user
    const fetchTasks = async () => {
        try {
            const response = await fetch(`${apiUrl}?userId=${userId}`);
            const data = await response.json();

            taskList.innerHTML = ""; // Clear existing list
            if (Array.isArray(data)) {
                data.forEach(todo => {
                    const li = document.createElement("li");
                    li.innerHTML = `<strong>Title: ${todo.title}</strong> Description: ${todo.description} 
                         <button onclick="deleteTask(${todo.id})" id="delete-btn">Delete</button>`;
                    taskList.appendChild(li);
                });
            } else {
                console.error("No tasks found or invalid data format.");
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Add a new task
    const addTask = async () => {
        const taskTitle = taskTitleInput.value.trim();
        const taskContent = taskContentInput.value.trim();

        if (taskTitle.length > 20) {
            alert("Title should not exceed 20 characters.");
            return;
        }

        if (taskContent.length > 100) {
            alert("Description should not exceed 100 characters.");
            return;
        }

        if (!taskTitle || !taskContent) {
            alert("Please enter both title and content for the task!");
            return;
        }

        // Ensure the user is created and exists
        const userId = await getUserId();
        if (userId === null) {
            alert("User creation failed!");
            return;
        }

        // Proceed with adding the task
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: taskTitle, description: taskContent, userId }),
        });

        if (response.ok) {
            taskTitleInput.value = "";
            taskContentInput.value = "";
            fetchTasks();
        } else {
            alert("Failed to add task.");
        }
    };

    // Delete a task
    window.deleteTask = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                fetchTasks();
            } else {
                alert("Failed to delete task.");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Event listeners
    addTaskBtn.addEventListener("click", addTask);
    taskTitleInput.addEventListener("keypress", (e) => { if (e.key === "Enter") addTask(); });
    taskContentInput.addEventListener("keypress", (e) => { if (e.key === "Enter") addTask(); });

    // Load tasks on page load
    fetchTasks();
});








