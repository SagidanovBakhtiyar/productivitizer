// Function to draw the chart
function drawPieChart(expenses) {
    let labels = [];
    let amounts = [];

    // Check if expenses array is empty
    if (expenses.length === 0) {
        // If expenses are none, provide default labels and amounts
        labels = ['No Expenses'];
        amounts = [1];
    } else {
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
        labels = Array.from(categoryMap.keys());
        amounts = Array.from(categoryMap.values());
    }

    // Generate dynamic colors for the chart
    const dynamicColors = () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r}, ${g}, ${b}, 0.3)`;
    };

    const backgroundColors = labels.map(() => dynamicColors());
    const borderColors = labels.map(() => 'rgba(0, 0, 0, 0.4)');

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
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Expense Distribution by Category'
            }
        }
    });
}
