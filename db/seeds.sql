-- Use the correct database
USE employee_tracker;

-- Insert data into the 'department' table
INSERT INTO department (name) VALUES 
('Engineering'),
('Human Resources'),
('Finance'),
('Sales'),
('Marketing');

-- Insert data into the 'role' table
INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 80000, 1),
('Senior Software Engineer', 100000, 1),
('HR Manager', 70000, 2),
('Accountant', 75000, 3),
('Sales Representative', 60000, 4),
('Marketing Coordinator', 55000, 5);

-- Insert data into the 'employee' table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Jim', 'Beam', 3, NULL),
('Jill', 'Valentine', 4, NULL),
('Jack', 'Daniels', 5, 3),
('Julia', 'Roberts', 6, 3);
