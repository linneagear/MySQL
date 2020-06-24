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
  
  // do a join to gather all relevant information to one table
  var query = "SELECT employees.first_name, employees.last_name, role.title AS \"role\", manager.first_name AS \"manager\" FROM employees LEFT JOIN role ON employees.role_id = role.id LEFT JOIN employees manager ON employees.manager_id = manager.id GROUP BY employees.id";

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
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start();
  });
};

function addEmployee() {
  inquirer
    .prompt([
      {
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
        name: "role",
        type: "list",
        message: "What is the employee's role?",
        choices: [1, 2, 3, 4, 5, 6]
      },
      {
        name: "managerID",
        type: "list",
        message: "What is the employee's manager id?",
        choices: [1, 2, 3, 4, 5, 6]
      }
    ])
    .then(function (res) {
      const query = connection.query(
        // once added, add to employees table
        "INSERT INTO employees SET ?",
        {
          first_name: res.firstName,
          last_name: res.lastName,
          role_id: res.role,
          manager_id: res.managerID
        },

        function (err, res) {
          connection.query("SELECT * FROM employees", function (err, data) {
            if (err) throw err;
            console.table("This employee has been added.");
            start();
          })
        })
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "deptName",
        type: "input",
        message: "What Department would you like to add?"
      }
    ])
    .then(function (res) {
      console.log(res);
      const query = connection.query(
        // once added, add to department table
        "INSERT INTO department SET ?",
        {
          name: res.deptName
        },

        function (err, res) {
          connection.query("SELECT * FROM department", function (err, res) {
            console.table("This department has been added.");
            start();
          })
        }
      )
    })
}

function addRole() {
  // to add the role to a specific department start with an empty array
  let department = [];
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;

    // push new role (result) to this array
    for (let i = 0; i < res.length; i++) {
      department.push({ name: res[i].name, value: res[i].id });
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
      .then(function (res) {

        console.log(res);

        // once input is gathered, add to role table
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: res.roleName,
            salary: res.newSalary,
            department_id: res.department
          },
          
          function (err, res) {
            connection.query("SELECT * FROM role", function (err, res) {
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
      message: "Which employee would you like to update (first name for now)?"
    },
    {
      name: "role",
      type: "input",
      message: "What is the employee's new role?"
    }
  ]).then(function (res) {

    connection.query("UPDATE employees SET role_id= ? WHERE first_name= ?", [res.role, res.name], function (err, res) {
      if (err) return err;

      console.table(res);
      start();
    });
  });
}