// Call the fetchExpenses function to instanly update the page when loaded
fetchExpenses();

// Update UI 
function updateUI(expenses, total) {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = ''; // Clear previous content

    if (expenses.length === 0) {
        expenseList.innerHTML = '<tr><td colspan="4" class="text-center">No expenses found.</td></tr>';
    } else {
        expenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="text-center">${expense.expense_title}</td>
                <td class="text-center">${expense.expense_description}</td>
                <td class="text-center">${expense.amount}</td>
                <td class="text-center">${expense.expense_date}</td>
            `;
            expenseList.appendChild(row);
        });
    }
    
    // Populate total amount
    document.getElementById('totalAmount').textContent = total;
}



// Add event listener to the form for submit event
document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    addExpense(); // Call addExpense function
});

