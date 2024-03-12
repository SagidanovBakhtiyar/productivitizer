// Call the fetchExpenses function to instanly update the page when loaded
fetchExpenses();

// Update the UI to display expenses and total amount
function updateUI(expenses, total) {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = ''; // Clear previous content

    if (expenses.length === 0) {
        expenseList.innerHTML = '<tr><td colspan="5" class="text-center">No expenses</td></tr>';
    } else {
        expenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="text-center">${expense.expense_title}</td>
                <td class="text-center">${expense.expense_description}</td>
                <td class="text-center">${expense.amount}</td>
                <td class="text-center">${expense.expense_date}</td>
                <td class="text-center">
                    <button class="delete-expense-btn" data-expense-id="${expense.id}">
                        <img src="/static/delete.png" alt="Delete task" class="delete-icon">
                    </button>
                </td>
            `;
            expenseList.appendChild(row);

            // Attach event listener to delete button
            const deleteButton = row.querySelector('.delete-expense-btn');
            deleteButton.addEventListener('click', () => {
                const expenseId = deleteButton.getAttribute('data-expense-id');
                deleteExpense(expenseId);
                fetchExpenses();
            });
        });
    }
    
    // Populate total amount
    document.getElementById('totalAmount').textContent = total;
    
    // Draw user expenses chart
    drawPieChart(expenses);
}



// Add event listener to the form for submit event
document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    addExpense(); // Call addExpense function
    fetchExpenses();
});


// Add event listener to the "Clear Expenses" button for click event
document.getElementById('clearExpenses').addEventListener('click', function(event) {
    event.preventDefault();
    clearExpenses();
    fetchExpenses();
});



