class DatabaseConnection {
    private static instance: DatabaseConnection | null = null;
    private connectionString: string;

    private constructor(connectionString: string) {
        this.connectionString = connectionString;
        console.log(`Connected to : ${connectionString}`);
    }

    static getInstance(): DatabaseConnection {
        if(DatabaseConnection.instance === null) {
            DatabaseConnection.instance = new DatabaseConnection("postgres://localhost:5432/mydb");
        }
        return DatabaseConnection.instance;
    }

    query(sql: string) {
        return `Executing on [${this.connectionString}]: ${sql}`; 
    }
}

// Client code

const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();

console.log(db1 == db2);
console.log(db1.query("SELECT * FROM users"));