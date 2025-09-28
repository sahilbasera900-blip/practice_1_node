// --- Main Application & UI Component ---
// This file handles the command-line interface and user interaction.

const readline = require('readline');
// Import the functions from our employee service module.
const employeeService = require('./employeeService');

// Create the readline interface for user input/output.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Displays the main menu and handles user choices.
 */
function showMenu() {
    console.log('\n--- Employee Management System ---');
    console.log('1. List All Employees');
    console.log('2. Add a New Employee');
    console.log('3. Remove an Employee');
    console.log('4. Exit');
    console.log('---------------------------------');

    rl.question('Please choose an option (1-4): ', (choice) => {
        switch (choice.trim()) {
            case '1':
                handleListEmployees();
                break;
            case '2':
                handleAddEmployee();
                break;
            case '3':
                handleRemoveEmployee();
                break;
            case '4':
                console.log('Exiting the application. Goodbye!');
                rl.close();
                break;
            default:
                console.log('Invalid option. Please enter a number between 1 and 4.');
                showMenu();
                break;
        }
    });
}

/**
 * Handles the logic for listing all employees.
 */
function handleListEmployees() {
    const employees = employeeService.getAllEmployees();
    console.log('\n--- List of All Employees ---');
    if (employees.length === 0) {
        console.log('No employees found.');
    } else {
        employees.forEach(employee => {
            console.log(`ID: ${employee.id}, Name: ${employee.name}`);
        });
    }
    showMenu();
}

/**
 * Handles the logic for adding a new employee.
 */
function handleAddEmployee() {
    console.log('\n--- Add a New Employee ---');
    rl.question('Enter employee ID: ', (id) => {
        rl.question('Enter employee name: ', (name) => {
            const result = employeeService.addEmployee(id.trim(), name.trim());
            console.log(result.message);
            showMenu();
        });
    });
}

/**
 * Handles the logic for removing an employee.
 */
function handleRemoveEmployee() {
    console.log('\n--- Remove an Employee ---');
    rl.question('Enter the ID of the employee to remove: ', (id) => {
        const result = employeeService.removeEmployee(id.trim());
        if (result.success) {
            console.log(`Successfully removed employee: ${result.employee.name} (ID: ${result.employee.id})`);
        } else {
            console.log(result.message);
        }
        showMenu();
    });
}

// --- Application Start ---
console.log('Welcome to the Employee Management CLI!');
showMenu();
