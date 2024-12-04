// Function to validate email and generate the meal plan
document.getElementById('generatePlan').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Generate the meal plan
    const name = document.getElementById('name').value;
    const goal = document.getElementById('goal').value;
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const meals = {};

    days.forEach(day => {
        meals[day] = {
            breakfast: document.querySelector(`[name="breakfast-${day.toLowerCase()}"]`).value,
            snack1: document.querySelector(`[name="snack1-${day.toLowerCase()}"]`).value,
            lunch: document.querySelector(`[name="lunch-${day.toLowerCase()}"]`).value,
            snack2: document.querySelector(`[name="snack2-${day.toLowerCase()}"]`).value,
            dinner: document.querySelector(`[name="dinner-${day.toLowerCase()}"]`).value
        };
    });

    // Generate and store the meal plan HTML
    window.generatedMealPlan = generateMealPlanHTML(name, email, goal, meals);

    // Open the meal plan in a new window
    const newWindow = window.open('', '_blank');
    newWindow.document.write(window.generatedMealPlan);
    newWindow.document.close();
});

// Function to validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to generate HTML content for the meal plan
function generateMealPlanHTML(name, email, goal, meals) {
    let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${name}'s Meal Plan</title>
            <style>
                body { font-family: monospace; padding: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid black; padding: 8px; text-align: left; }
                th { background-color: #f4f4f4; }
            </style>
        </head>
        <body>
            <h1>${name}'s Weekly Meal Plan</h1>
            <p>Email: ${email}</p>
            <p>Goal: ${goal}</p>
            <table>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Breakfast</th>
                        <th>Snack 1</th>
                        <th>Lunch</th>
                        <th>Snack 2</th>
                        <th>Dinner</th>
                    </tr>
                </thead>
                <tbody>
    `;

    for (const [day, meal] of Object.entries(meals)) {
        html += `
            <tr>
                <td>${day}</td>
                <td>${meal.breakfast}</td>
                <td>${meal.snack1}</td>
                <td>${meal.lunch}</td>
                <td>${meal.snack2}</td>
                <td>${meal.dinner}</td>
            </tr>
        `;
    }

    html += `
                </tbody>
            </table>
        </body>
        </html>
    `;

    return html;
}

// Print functionality for the generated page
document.getElementById('printPlan').addEventListener('click', () => {
    if (!window.generatedMealPlan) {
        alert('Please generate a meal plan first.');
        return;
    }
    const newWindow = window.open('', '_blank');
    newWindow.document.write(window.generatedMealPlan);
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
});

// Download functionality for the generated page
document.getElementById('downloadPlan').addEventListener('click', () => {
    if (!window.generatedMealPlan) {
        alert('Please generate a meal plan first.');
        return;
    }
    const blob = new Blob([window.generatedMealPlan], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'meal-plan.html';
    link.click();
});

// Clear planner functionality
document.getElementById('mealPlanForm').addEventListener('reset', () => {
    window.generatedMealPlan = null; 
    alert('Meal planner cleared from memory.');
});
