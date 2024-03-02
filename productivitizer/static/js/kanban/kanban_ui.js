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


// Deprecated.
// Schedule fetching tasks at regular intervals (e.g., every 10 seconds)
// setInterval(fetchAndRenderTasks, 10000); 


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

