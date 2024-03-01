// Function to update the UI with the fetched tasks
function updateUITasks(tasks) {
    // Clear existing tasks in each column
    document.getElementById('taskTodo').innerHTML = '';
    document.getElementById('taskDoing').innerHTML = '';
    document.getElementById('taskDone').innerHTML = '';

    // Iterate over the fetched tasks and create HTML elements to display them
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task', 'card', 'mb-3');
        taskElement.innerHTML = `
            <div class="card-body">
                <p>Task: ${task.task_title}</p>
                <p>Description: ${task.task_description}</p>
            </div>
        `;

        // Determine which column the task belongs to based on its status
        let column;
        switch (task.task_status) {
            case 'todo':
                column = document.getElementById('taskTodo');
                break;
            case 'doing':
                column = document.getElementById('taskDoing');
                break;
            case 'done':
                column = document.getElementById('taskDone');
                break;
            default:
                column = null;
        }

        // Append the task element to the appropriate column
        if (column) {
            column.appendChild(taskElement);
        }
    });
}

// Schedule fetching tasks at regular intervals (e.g., every 5 seconds)
setInterval(fetchAndRenderTasks, 5000); 