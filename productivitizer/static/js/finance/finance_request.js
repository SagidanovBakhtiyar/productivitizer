// Requests to backend

// Function to add an expense
async function addExpense() {
    const expenseForm = document.getElementById('expenseForm');
    const formData = new FormData(expenseForm);

    try {
        const response = await fetch('/finance/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                expense_title: formData.get('expense'),
                expense_description: formData.get('description'),
                amount: formData.get('amount')
            }),
            credentials: 'same-origin'
        });

        if (!response.ok) {
            throw new Error('Failed to add expense');
        }

        expenseForm.reset();

        // Refresh the expenses list after adding
        fetchExpenses();
    } catch (error) {
        console.error(error.message);
    }
}


// Function to fetch expenses
async function fetchExpenses() {
    try {
        const response = await fetch('/finance/read', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }

        const responseData = await response.json();
        const expenses = responseData.expenses;
        const total = responseData.total;

        // Call ui functions
        updateUI(expenses, total);
        drawPieChart(expenses);
    } catch (error) {
        console.error(error.message);
    }
}


// Function to delete individual expenses
async function deleteExpense(expenseId) {
    try {
        // Delete request to backend
        const response = await fetch(`/finance/delete/${expenseId}`, {
            method: 'DELETE',
            credentials: 'same-origin'
        });


        if (!response.ok) {
            throw new Error('Failed to delete task');
        }

        fetchExpenses();
        return response.json();

    } catch (error) {
        console.error(error.message);
    }
}


// Function to clear expenses
function clearExpenses() {
    fetch('/finance/clear', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            console.log('Expenses cleared successfully');
            // Update page
            fetchExpenses();
        } else {
            console.error('Failed to clear expenses');
        }
    })
    .catch(error => {
        console.error('Error clearing expenses: ', error);
    });
}