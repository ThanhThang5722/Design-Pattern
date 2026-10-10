interface MessageSender {
    send(to: string, content: string): void;
}

class EmailSender implements MessageSender {
    send(to: string, content: string): void {
        console.log(`Email ${to}: ${content}`);
    }
}

class SMSSender implements MessageSender {
    send(to: string, content: string): void {
        console.log(`SMS ${to}: ${content}`);
    }
}

abstract class Noti {
    constructor(protected sender: MessageSender) {} // Bridge
    abstract send(to: string): void;
}

class OrderNotification extends Noti {
    constructor(sender: MessageSender, private orderId: string){
        super(sender);
    }

    send(to: string): void {
        this.sender.send(to, `Your order #${this.orderId} has been placed.`);
    }
}

class PromoNotification extends Noti {
    constructor(sender: MessageSender, private promoCode: string) {
        super(sender);
    }
    send(to: string): void {
        this.sender.send(to, `Use code ${this.promoCode} for 20% off!`);
    }
}

// Client code
const emailSender = new EmailSender();
const smsSender = new SMSSender();

new OrderNotification(emailSender, "ORD-001").send("alice@example.com");
new OrderNotification(smsSender,   "ORD-002").send("0901234567");
new PromoNotification(emailSender, "SAVE20").send("bob@example.com");

