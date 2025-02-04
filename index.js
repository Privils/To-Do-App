document.addEventListener("DOMContentLoaded", () => {
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskTitleInput = document.getElementById("task-title");
    const taskContentInput = document.getElementById("task-content");
    const taskList = document.getElementById("task-list");
    let taskId = 1; 

    addTaskBtn.addEventListener("click", () => {
        const taskTitle = taskTitleInput.value.trim();
        const taskContent = taskContentInput.value.trim();

        if (taskTitle === "" || taskContent === "") {
            alert("Please enter both title and content for the task!");
            return;
        }

        const taskItem = document.createElement("li");
        taskItem.setAttribute("data-aos", "fade-up");
        taskItem.setAttribute("data-aos-duration", "1000");
        taskItem.innerHTML = `
            <p class="task-id">Task ID: ${taskId}</p>
            <p class="task-title">Title: ${taskTitle}</p>
            <p class="task-content">${taskContent}</p>
            <button class="delete-btn">X</button>
        `;

        taskList.appendChild(taskItem);
        taskTitleInput.value = "";
        taskContentInput.value = "";
        taskId++; // add id for the following taks

        AOS.refresh(); // Refresh animations for newly added elements

        taskItem.querySelector(".delete-btn").addEventListener("click", () => {
            taskItem.remove();
            reorderTaskIds(); // Reorder IDs after deletion
        });
    });

    // Allow pressing Enter to add a task
    taskTitleInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTaskBtn.click();
    });

    taskContentInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTaskBtn.click();
    });

    function reorderTaskIds() {
        const taskItems = document.querySelectorAll("#task-list li");
        taskItems.forEach((item, index) => {
            const idElement = item.querySelector(".task-id");
            idElement.textContent = `Task ID: ${index + 1}`;
        });
        taskId = taskItems.length + 1; // Reset task ID to next number
    }
});
