// Requests to backend api

// Function to create tasks
async function createTask(taskTitle, taskDescription = null, taskStatus) {
    try {
        // Prepare the request body to backend
        const request = JSON.stringify({
            task_title: taskTitle,
            task_description: taskDescription,
            task_status: taskStatus
        });

        // POST request to backend
        const response = await fetch('/kanban/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: request
        });

        if (!response.ok) {
            throw new Error('Failed to create new task');
        }

        return response.json();

    } catch (error) {
        console.error('Error creating the task:', error.message);
    } 
}


// Function to fetch tasks from the server and update the UI
async function fetchAndRenderTasks() {
    try {
        const response = await fetch('/kanban/read', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }

        const tasks = await response.json();
        
        // Update the UI with the fetched tasks
        updateUITasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
    }
}

// Call the render tasks function to instanly update the page when loaded
fetchAndRenderTasks();
