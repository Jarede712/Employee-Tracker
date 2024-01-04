const inquirer = require('inquirer');
const connection = require('./config/connection');
const Department = require('./lib/Department');
const Role = require('./lib/Role');
const Employee = require('./lib/Employee');

const department = new Department(connection);
const role = new Role(connection);
const employee = new Employee(connection);

function startApp() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Exit'
        ]
    }])
    .then((answers) => {
        switch (answers.action) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployeeRole();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    })
    .catch(error => console.error(error));
}

function viewDepartments() {
    department.viewAll()
        .then(([rows]) => {
            console.table(rows);
            startApp();
        })
        .catch(err => console.error(err));
}

function viewRoles() {
    role.viewAll()
        .then(([rows]) => {
            console.table(rows);
            startApp();
        })
        .catch(err => console.error(err));
}

function viewEmployees() {
    employee.viewAll()
        .then(([rows]) => {
            console.table(rows);
            startApp();
        })
        .catch(err => console.error(err));
}

function addDepartment() {
    inquirer.prompt([{
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the new department:'
    }])
    .then(answer => {
        department.add(answer.departmentName)
            .then(() => {
                console.log(`Added ${answer.departmentName} to the database`);
                startApp();
            })
            .catch(err => console.error(err));
    });
}

function addRole() {
    // Fetch departments for the choices
    department.viewAll()
        .then(([departments]) => {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the title of the new role:'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary for this role:'
                },
                {
                    type: 'list',
                    name: 'departmentId',
                    message: 'Which department does this role belong to?',
                    choices: departments.map(department => ({
                        name: department.name,
                        value: department.id
                    }))
                }
            ]);
        })
        .then(answers => {
            role.add(answers.title, answers.salary, answers.departmentId)
                .then(() => {
                    console.log(`Added role ${answers.title} to the database`);
                    startApp();
                })
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
}

function addEmployee() {
    // Fetch roles and employees for the choices
    Promise.all([role.viewAll(), employee.viewAll()])
        .then(([[roles], [employees]]) => {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter the employee’s first name:'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter the employee’s last name:'
                },
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'What is the employee’s role?',
                    choices: roles.map(role => ({
                        name: role.title,
                        value: role.id
                    }))
                },
                {
                    type: 'list',
                    name: 'managerId',
                    message: 'Who is the employee’s manager?',
                    choices: employees.map(employee => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    })).concat([{ name: 'None', value: null }])
                }
            ]);
        })
        .then(answers => {
            employee.add(answers.firstName, answers.lastName, answers.roleId, answers.managerId)
                .then(() => {
                    console.log(`Added employee ${answers.firstName} ${answers.lastName} to the database`);
                    startApp();
                })
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
}

function updateEmployeeRole() {
    // Fetch employees and roles for the choices
    Promise.all([employee.viewAll(), role.viewAll()])
        .then(([[employees], [roles]]) => {
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Which employee’s role do you want to update?',
                    choices: employees.map(emp => ({
                        name: `${emp.first_name} ${emp.last_name}`,
                        value: emp.id
                    }))
                },
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'Which role do you want to assign to the selected employee?',
                    choices: roles.map(role => ({
                        name: role.title,
                        value: role.id
                    }))
                }
            ]);
        })
        .then(answers => {
            employee.updateRole(answers.employeeId, answers.roleId)
                .then(() => {
                    console.log(`Updated employee's role in the database`);
                    startApp();
                })
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
}

// Initialize the application
startApp();
