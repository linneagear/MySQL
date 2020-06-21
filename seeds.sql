USE employee_DB;

INSERT INTO department (name)
VALUES ("Sales"), ("Finance"), ("Engineering");

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 2, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Rodriguez", 3, null);


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Finance Supervisor", 80000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 150000, 3);

