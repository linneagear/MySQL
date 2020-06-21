// Add view and update 
var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require('console.table');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "@Aries17445!",
    database: "employee_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// initial function that begins application
function start() {
    inquirer
        .prompt({
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees by Role",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.choice) {

                case "View All Employees":
                    viewEmployees();
                    break;
                case "View All Employees By Department":
                    viewDepartment();
                    break;

                case "View All Employees By Role":
                    viewRole();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Update Employee Role":
                    addRole();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
};

function viewEmployees() {
    var query = "SELECT employee.first_name, employee.last_name, role.title AS \"role\", manager.first_name AS \"manager\" FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON employee.manager_id = manager.id GROUP BY employee.id"

    // do a join to gather all relevant information to one table
    connection.query(query, function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        start();
    });
};

function viewDepartment() {

};

function viewRole() {

};

function addEmployee() {
    inquirer
        .prompt({
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?",
        },
        {
           name: "last_name",
            type: "input",
            message: "What is the employee's last name?",
        },
        {
            name: "role_id",
            type: "input",
            message: "What is the employee's role id?",
            choice: [1,2,3]
        },
        {
            name: "manager_id",
            type: "input",
            message: "Who is their manager?",
        }
        )
        .then(function (answer) {
              // when finished prompting, insert a new item into the db with that info
            connection.query(
            "INSERT INTO employee SET ?", answer, function (err, res) {
                if (err) throw err;
                console.log("Your employee was added created successfully!");
                // re-prompt the user 
                start();
            });
        });
}

function addDepartment() {

};

function addRole() {

};

function updateRole() {

};

