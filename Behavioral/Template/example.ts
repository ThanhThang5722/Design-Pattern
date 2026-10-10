abstract class ReportGenerator {
    generate(): void {
        const data = this.fetchData();
        const processed = this.processData(data);
        const output = this.formatOutput(processed);
        this.export(output);
    }

    abstract fetchData(): number[];
    abstract formatOutput(data: number[]): string;

    processData(data: number[]): number[] {
        return data.filter(n => n > 0);
    }

    export(output: string): void {
        console.log(`Exporting: ${output}`);
    }
}

class CSVReport extends ReportGenerator {
    fetchData(): number[] {
        return [10, -5, 30, 0, 20];
    }

    formatOutput(data: number[]): string {
        return data.join(",");
    }
}

class JSONReport extends ReportGenerator {
    fetchData(): number[] {
        return [100, -20, 50];
    }
    formatOutput(data: number[]): string {
        return JSON.stringify(data);
    }
}