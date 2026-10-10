interface Notifier {
    send(to: string, message: string): string;
}

class EmailNotifier implements Notifier {
    send(to: string, message: string): string {
        return `Send by Email to: ${to} with message: ${message}`;
    }
}

class SMSNotifier implements Notifier {
    send(to: string, message: string): string {
        return `Send by SMS to: ${to} with message: ${message}`;
    }
}

// Concrete
abstract class NotificationService {
    abstract createNotifier(): Notifier;

    public notify(to: string, message: string) {
        const notifier = this.createNotifier();
        return notifier.send(to, message);
    }
}

class EmailNotificationService extends NotificationService{
    createNotifier(): Notifier {
        return new EmailNotifier();
    }
}

class SMSNotificationService extends NotificationService{
    createNotifier(): Notifier {
        return new SMSNotifier();
    }
}

// client code
function sendNotification(choice: NotificationService, to: string, message: string) {
    return choice.notify(to, message);
}

sendNotification(new EmailNotificationService(), "bob", "hi bob");
sendNotification(new SMSNotificationService(), "bob", "hi bob");