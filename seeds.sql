USE employee_DB;

INSERT INTO department (name)
VALUES ("Sales"), ("Finance"), ("Engineering"), ("Legal"), ("Marketing"), ("Marketing");

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 2, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Rodriguez", 3, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Susan", "Anthony", 4, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Shelah", "Drees", 5, 6);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Bruce", "Anderson", 6, null);


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Financial Supervisor", 80000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 150000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 98000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Marketer", 60000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Manager", 75000, 3);

