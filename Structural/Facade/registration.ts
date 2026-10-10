class UserValidator {
    validator(email: string, password: string): boolean {
        if (!email.includes("@")) {
            console.log("Invalid email");
            return false;
        }
        return true;
    }
}

class UserRepository {
    save(email: string, password: string): string {
        console.log("save to db...");
        return "user" + email + password; // userId
    }
}

class WelcomeEmailSerivce {
    send(email: string, userId: string): void {
        console.log(`sending mail to userId:${userId} mail: ${email}`);
    }
}

class AuditLogger {
    log(userId: string, event: string): void {
        console.log(`userId:${userId} event: ${event}`);
    }
}

class RegistrationFacade {
    constructor(
        private userValidator: UserValidator,
        private userRepository: UserRepository,
        private welcomeEmailService: WelcomeEmailSerivce,
        private auditLogger: AuditLogger
    ) {}
    register(email: string, password: string): boolean {
        if(!this.userValidator.validator(email, password)) return false;
        const userId = this.userRepository.save(email,password);
        if(!userId || userId === "") return false;
        this.welcomeEmailService.send(email, userId);
        this.auditLogger.log(userId, "Regist success fully");
        return true;
    }
}

// Client code
const myFacade = new RegistrationFacade(
    new UserValidator(),
    new UserRepository(),
    new WelcomeEmailSerivce(),
    new AuditLogger()
);
myFacade.register("test@gmail.com", "123");
myFacade.register("invalid-email", "123"); // fail case
