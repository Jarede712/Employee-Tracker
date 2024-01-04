class Query {
    constructor(connection) {
        this.connection = connection;
    }

    // Perform a generic select query
    selectAll(tableName) {
        return this.connection.promise().query(`SELECT * FROM ${tableName}`);
    }

    // Insert a new record into any table
    insertOne(tableName, columnValues) {
        return this.connection.promise().query(`INSERT INTO ${tableName} SET ?`, columnValues);
    }

    // Update a specific record in any table
    updateOne(tableName, columnValues, condition) {
        return this.connection.promise().query(`UPDATE ${tableName} SET ? WHERE ?`, [columnValues, condition]);
    }
}

module.exports = Query;
