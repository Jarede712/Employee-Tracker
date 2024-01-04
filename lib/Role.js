class Role {
    constructor(connection) {
        this.connection = connection;
    }

    // Method to view all roles
    viewAll() {
        return this.connection.promise().query(
            'SELECT role.id, role.title, department.name AS department, role.salary ' +
            'FROM role ' +
            'INNER JOIN department ON role.department_id = department.id'
        );
    }

    // Method to add a new role
    add(title, salary, departmentId) {
        return this.connection.promise().query(
            'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
            [title, salary, departmentId]
        );
    }
}

module.exports = Role;
