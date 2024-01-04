class Employee {
    constructor(connection) {
        this.connection = connection;
    }

    // Method to view all employees
    viewAll() {
        return this.connection.promise().query(
            `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, 
             r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
             FROM employee e
             LEFT JOIN role r ON e.role_id = r.id
             LEFT JOIN department d ON r.department_id = d.id
             LEFT JOIN employee m ON e.manager_id = m.id`
        );
    }

    // Method to add a new employee
    add(firstName, lastName, roleId, managerId) {
        return this.connection.promise().query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [firstName, lastName, roleId, managerId]
        );
    }

    // Method to update an employee's role
    updateRole(employeeId, newRoleId) {
        return this.connection.promise().query(
            'UPDATE employee SET role_id = ? WHERE id = ?',
            [newRoleId, employeeId]
        );
    }
}

module.exports = Employee;
