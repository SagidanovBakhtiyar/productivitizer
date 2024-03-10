// Function to draw the chart
function drawPieChart(expenses) {
    // Group expenses by category and calculate total amount for each category
    const categoryMap = new Map();
    expenses.forEach(expense => {
        if (categoryMap.has(expense.expense_title)) {
            categoryMap.set(expense.expense_title, categoryMap.get(expense.expense_title) + expense.amount);
        } else {
            categoryMap.set(expense.expense_title, expense.amount);
        }
    });

    // Extract labels and data
    const labels = Array.from(categoryMap.keys());
    const amounts = Array.from(categoryMap.values());

    // Generate dynamic colors for the chart
    const dynamicColors = () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r}, ${g}, ${b}, 0.3)`;
    };

    const backgroundColors = labels.map(() => dynamicColors());
    const borderColors = labels.map(() => 'rgba(255, 255, 255, 1)');

    // Get the canvas element
    const myCanvas = document.getElementById('pie-chart').getContext('2d');

    // Create the chart
    new Chart(myCanvas, {
        type: 'pie', 
        data: {
            labels: labels,
            datasets: [{
                label: 'Expenses',
                data: amounts,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Add this line to prevent the chart from being distorted
            title: {
                display: true,
                text: 'Expense Distribution by Category'
            }
        }
    });
}
