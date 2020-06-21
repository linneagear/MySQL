// Add view and update 
var mysql = require("mysql");
var inquirer = require("inquirer");

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
connection.connect(function(err) {
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
          "Update Employee Role"
        ]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.choice === "View All Employees") {
        viewEmployees();
      }
      else if(answer.choice === "View All Employees By Department") {
        viewDepartment();
      } 
      else if(answer.choice === "View All Employees By Role") {
        viewRole();
      } 
      else if(answer.choice === "Add Employee") {
        addEmployee();
      } 
      else if(answer.choice === "Add Department") {
        addDepartment();
      } 
      else if(answer.choice === "Add Role") {
        addRole();
      } 
      else if(answer.choice === "Update Employee Role") {
        updateRole();
      } 
      else{
        connection.end();
      }
    });
}