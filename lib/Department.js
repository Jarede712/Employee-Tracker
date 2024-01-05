class Department {
    constructor(connection) {
        this.connection = connection;
    }

    // Method to view all departments
    viewAll() {
        return this.connection.promise().query(
            'SELECT id, name FROM department'
        );
    }

    // Method to add a new department
    add(name) {
        return this.connection.promise().query(
            'INSERT INTO department (name) VALUES (?)', [name]
        );
    }
}

module.exports = Department;
