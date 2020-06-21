USE employee_DB;

INSERT INTO department (name)
VALUES ("Sales"), ("Sales"), ("Engineering")

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null)
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 2, null)
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Rodriguez", 3, 3)


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Supervisor", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 150000, 2);

