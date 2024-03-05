// Call the render tasks function to instanly update the page when loaded
fetchAndRenderTasks();

// UpdateUI calls in fetchAndRender task function. Tasks represents all tasks of user
function updateUITasks(tasks) {
    // Clear existing tasks in each column
    document.getElementById('taskTodo').innerHTML = '';
    document.getElementById('taskDoing').innerHTML = '';
    document.getElementById('taskDone').innerHTML = '';

    // Iterate over the fetched tasks and create HTML elements to display them
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task', 'card', 'mb-3');
        taskElement.dataset.taskId = task.id;
        taskElement.innerHTML = `
            <div class="card-body">
                <p>Task: ${task.task_title}</p>
                <p>Description: ${task.task_description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <a href="#" class="update-task-btn">
                            <img src="/static/refresh.png" alt="Update Task" class="update-icon">
                        </a>
                        <a href="#" class="delete-task-btn">
                            <img src="/static/delete.png" alt="Delete task" class="delete-icon">
                        </a>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Status
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="#" data-status="todo">Todo</a></li>
                            <li><a class="dropdown-item" href="#" data-status="doing">Doing</a></li>
                            <li><a class="dropdown-item" href="#" data-status="done">Done</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        // Append the task element to the appropriate column
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

        // Append the task element to the column
        if (column) {
            column.appendChild(taskElement);
        }

        // Update task button functionality
        taskElement.querySelector('.update-task-btn').addEventListener('click', async (event) => {   
            event.preventDefault();

            try {
                // Prompt the user for updated task details
                const updatedTitle = prompt('Enter updated task title:', task.task_title);
                const updatedDescription = prompt('Enter updated task description:', task.task_description);

                // Call the updateTask function with updated details
                await updateTask(task.id, updatedTitle, updatedDescription, task.task_status);
                fetchAndRenderTasks();

            } catch (error) {
                console.error('Error updating task: ', error);
            }
        });

        // Delete task button functionality
        taskElement.querySelector('.delete-task-btn').addEventListener('click', async (event) => {
            event.preventDefault();

            try {
                // Call the delete task that user selected
                await deleteTask(task.id);
                fetchAndRenderTasks();
                
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        });

        // Dropdown menu item functionality
        const dropdownItems = taskElement.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', async (event) => {
                event.preventDefault();
                const newStatus = item.dataset.status;
                
                // Call the updateTask function with updated status
                await updateTask(task.id, task.task_title, task.task_description, newStatus);
                fetchAndRenderTasks();
            });
        });
    });
}



// Deprecated.
// Schedule fetching tasks at regular intervals (e.g., every 10 seconds)
// setInterval(fetchAndRenderTasks, 10000); 


// Create task buttons ui
// ToDo create task
document.addEventListener('DOMContentLoaded', () => {
    const formTodo = document.getElementById('taskFormTodo');

    formTodo.addEventListener('submit', async (event) => {
        event.preventDefault();

        const taskTitle = document.getElementById('taskTitleTodo').value;
        const taskDescription = document.getElementById('taskDescriptionTodo').value;
        const taskStatus = formTodo.dataset.status;

        try {

            const createdTask = await createTask(taskTitle, taskDescription, taskStatus);
            document.getElementById('taskTitleTodo').value = '';
            document.getElementById('taskDescriptionTodo').value = '';

            // Fetch the created tasks
            fetchAndRenderTasks();
            console.log('Task created');

        } catch (error) {
            console.error('Error creating task:', error.message);
        }
    });
});


// Doing create task
document.addEventListener('DOMContentLoaded', () => {
    const formDoing = document.getElementById('taskFormDoing');

    formDoing.addEventListener('submit', async (event) => {
        event.preventDefault();     

        const taskTitle = document.getElementById('taskTitleDoing').value;
        const taskDescription = document.getElementById('taskDescriptionDoing').value;
        const taskStatus = formDoing.dataset.status;

        try {
            const createdTask = await createTask(taskTitle, taskDescription, taskStatus);
            document.getElementById("taskTitleDoing").value = '';
            document.getElementById("taskDescriptionDoing").value = '';

            fetchAndRenderTasks();
            console.log('Task created');
        } catch (error) {
            console.error('Error creating task:', error.message);
        }
    });
});


// Done create task
document.addEventListener('DOMContentLoaded', () => {
    const formDone = document.getElementById('taskFormDone');

    formDone.addEventListener('submit', async (event) => {
        event.preventDefault();     

        const taskTitle = document.getElementById('taskTitleDone').value;
        const taskDescription = document.getElementById('taskDescriptionDone').value;
        const taskStatus = formDone.dataset.status;

        try {
            const createdTask = await createTask(taskTitle, taskDescription, taskStatus);
            document.getElementById("taskTitleDone").value = '';
            document.getElementById("taskDescriptionDone").value = '';

            fetchAndRenderTasks();
            console.log('Task created');
        } catch (error) {
            console.error('Error creating task:', error.message);
        }
    });
});