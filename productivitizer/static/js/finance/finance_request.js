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

        updateUI(expenses, total);
    } catch (error) {
        console.error(error.message);
    }
}
