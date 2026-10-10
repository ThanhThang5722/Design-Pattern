interface Logger {
    log(level: string, message: string): void;
}

class LegacyLogger {
    writeLog(message: string): void {
        console.log(`[LEGACY] ${message}`);
    }
}

class LegacyLoggerAdapter implements Logger {
    private legacy: LegacyLogger;
    constructor() {
        this.legacy = new LegacyLogger();
    }

    log(level: string, message: string): void {
        this.legacy.writeLog(`${level}: ${message}`);
    }
}

// client code
const legacyAdapter = new LegacyLoggerAdapter();
legacyAdapter.log("INFO", "1");
legacyAdapter.log("WARN", "1");
legacyAdapter.log("ERROR", "1");