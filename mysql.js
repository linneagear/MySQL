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
                "View All Departments",
                "View All Roles",
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
                case "View All Departments":
                    viewDepartment();
                    break;

                case "View All Roles":
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
                    updateRole();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
};

function viewEmployees() {
    var query = "SELECT employees.first_name, employees.last_name, role.title AS \"role\", manager.first_name AS \"manager\" FROM employees LEFT JOIN role ON employees.role_id = role.id LEFT JOIN employees manager ON employees.manager_id = manager.id GROUP BY employees.id";
    // var query = "SELECT employees.first_name, employees.last_name, role.title FROM employees INNER JOIN role ON employees.role_id = role.title"
    
    // do a join to gather all relevant information to one table
    connection.query(query, function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        start();
    });
};

function viewDepartment() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        start();
    });
};

function viewRole() {
    connection.query("SELECT role.*, department.name FROM role LEFT JOIN department ON department.id = role.department_id", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        start();
    });
};

// last name cannot be null? won't go to the next prompt?
function addEmployee() {
    // let employeeList = [];
    // connection.query("SELECT * FROM employees", function(err,res){
    //   if(err) throw err;

    //   for (let i=0; i <res.length; i++){
    //     employeeList.push(
    //         {
    //         first_name: res[i].first_name, 
    //         last_name: res[i].last_name,
    //         role_id: res[i].role_id,
    //         manager_id: res[i].manager_id
    //     })
    //   }

    inquirer
        .prompt({
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?",
        },
        {
           name: "lastName",
           type: "input",
           message: "What is the employee's last name?",
        },
        {
            name: "roleID",
            type: "list",
            message: "What is the employee's role id?",
            choice: [1,2,3]
        },
        {
            name: "managerID",
            type: "list",
            message: "What is the employee's manager id?",
            choice: [1,2,3]
        })
        .then(function(res) {
            connection.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleID, res.managerID], function(err, data) {
                if (err) throw err;
                console.table("Successfully Inserted");
                start();
            })
        })
};

function addDepartment(){
    inquirer
    .prompt([
      {
        type: "input",
        name: "deptName", 
        message: "What Department would you like to add?"
      }
    ])
    .then(function(res){
      console.log(res);
      const query = connection.query(
        //   once added, add to department table
        "INSERT INTO department SET ?", 
        {
          name: res.deptName
        }, 
        function(err, res){
          connection.query("SELECT * FROM department", function(err, res){
            console.table(`This department has been added.`); 
            start(); 
          })
        }
      )
    })
  }

function addRole() {
    // to add the role to a specific department start with an empty array
    let department = [];
    connection.query("SELECT * FROM department", function(err,res){
      if(err) throw err;

      for (let i=0; i <res.length; i++){
        department.push({name: res[i].name, value: res[i].id});
      }
    
    inquirer
    .prompt([
      {
        type: "input",
        name: "roleName", 
        message: "What role would you like to add?"
      },
      {
        type: "input",
        name: "newSalary", 
        message: "What will that role's salary be?"
      },
      {
        type: "list",
        name: "department",
        message: "What department?",
        choices: department
      }
    ])
    .then(function(res){
      console.log(res);
      const query = connection.query(
        //   once added, add to department table
        "INSERT INTO role SET ?", 
        {
          title: res.roleName,
          salary: res.newSalary,
          department_id: res.department
        }, 
        function(err, res){
          connection.query("SELECT * FROM role", function(err, res){
            console.table(`This role has been added.`); 
            start(); 
          })
        }
      )
    })
  });
};

function updateRole() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "which employee would you like to update? (use first name only for now)",
        }, 
        {
            name: "role_id",
            type: "number",
            message: "Enter the new role ID: "
        }
    ]).then(function (answer) {
        connection.query("UPDATE employees SET role_id = ? WHERE first_name = ?", [answer.role_id, answer.name], function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        })
    })
};

