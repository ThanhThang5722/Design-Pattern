class Logger {
    private static instance: Logger | null = null;
    private constructor(){}
    static getInstance(): Logger {
        if(Logger.instance === null) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    log(level: "INFO" | "WARN" | "ERROR", message: string) { 
        console.log(`[${level}] ${new Date().toISOString()} - ${message}`)
    }
}