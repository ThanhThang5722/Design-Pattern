interface Exporter {
    export(content: string): string;
}

class JSONExporter implements Exporter {
    export(content: string): string {
        return `{"report": "${content}"}`;
    }
}

class CSVExporter implements Exporter {
    export(content: string): string {
        return `report, ${content}`;
    }
}

abstract class Report {
    constructor(protected exporter: Exporter) {}
    abstract generate(): string;
}

class SalesReport extends Report {
    constructor(exporter: Exporter, private total: number, private count: number) {
        super(exporter);
    }
    public generate(): string {
        return this.exporter.export(`total = ${this.total}, count = ${this.count}`)
    }
}

class UserReport extends Report {
    constructor(exporter: Exporter, private active: string, private newUsers: string) {
        super(exporter);
    }
    public generate(): string {
        return this.exporter.export(`active = ${this.active}, newUsers = ${this.newUsers}`);   
    }
}

// client code
const sale1 = new SalesReport(new JSONExporter(), 1,2).generate();
const sale2 = new SalesReport(new CSVExporter(), 1,2).generate();
const user1 = new UserReport(new JSONExporter(), "a", "b").generate();
const user2 = new UserReport(new CSVExporter(), "a", "b").generate();

console.log(sale1);
console.log(sale2);
console.log(user1);
console.log(user2);