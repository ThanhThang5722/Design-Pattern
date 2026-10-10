interface Connection {
    connect(): string;
}

interface QueryBuilder {
    build(table: string): string;
}

// Concrete
class MySQLConnection implements Connection {
    connect(): string {
        return "conneted using MySQL";
    }
}

class MySQLQueryBuilder implements QueryBuilder {
    build(table: string): string {
        return `SELECT * FROM \`${table}\``;
    }
}

class PostgresConnection implements Connection {
    connect(): string {
        return "connected using Postgres";
    }
}

class PostgresBuilder implements QueryBuilder {
    build(table: string): string {
        return `SELECT * FROM "${table}"`;;
    }
}

interface DatabaseFactory {
    createConnection(): Connection,
    createQueryBuilder(): QueryBuilder
}

class MySQLFactory implements DatabaseFactory {
    createConnection(): Connection {
        return new MySQLConnection();
    }
    createQueryBuilder(): QueryBuilder {
        return new MySQLQueryBuilder();
    }
}

class PostgresFactory implements DatabaseFactory {
    createConnection(): Connection {
        return new PostgresConnection();
    }
    createQueryBuilder(): QueryBuilder {
        return new PostgresBuilder();
    }
}

// Client Code
function runQuery(kind: DatabaseFactory, query: string) {
    const connection = kind.createConnection();
    const builder = kind.createQueryBuilder();
    console.log(connection.connect());
    console.log(builder.build(query));
}

const dbType = "MySQL";
const dbFactory = dbType === "MySQL" ? new MySQLFactory() : new PostgresFactory();

runQuery(dbFactory,"USER");