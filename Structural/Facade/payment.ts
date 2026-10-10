class InventoryService {
    check(productId: string): boolean {
        console.log(`Checking inventory for ${productId}`);
        return true;
    }
}

class PaymentService {
    charge(userId: string, amount: number): boolean {
        console.log(`Charging $${amount} to user ${userId}`);
        return true;
    }
}

class OrderService {
    create(userId: string , productId: string): string {
        const orderId = `ORD-${Date.now()}`;
        console.log(`Order ${orderId} created`);
        return orderId;
    }
}

class EmailService {
    sendConfirmation(userId: string, orderId: string): void {
        console.log(`Confirmation email sent to ${userId} for ${orderId}`);
    }
}

class OrderFacade {
    private inventory = new InventoryService();
    private payment = new PaymentService();
    private order = new OrderService();
    private email = new EmailService();

    placeOrder(userId: string, productId: string, amount: number): void {
        if(!this.inventory.check(productId)) {
            console.log("Out of stock");
            return;
        }
        if(!this.payment.charge(userId, amount)) {
            console.log("Payment failed");
            return;
        }
        const orderId = this.order.create(userId, productId);
        this.email.sendConfirmation(userId, orderId);
        console.log("Order placed successfully!");
    }
}


// Client code 
const facade = new OrderFacade();
facade.placeOrder("user-123", "product-456", 99);