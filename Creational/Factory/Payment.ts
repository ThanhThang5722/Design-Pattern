interface PaymentGateway {
    processPayment(amount: number): string;
}

class VNPayGateway implements PaymentGateway {
    processPayment(amount: number): string {
        return `VNPay: processed ${amount} VND`;
    }
}

class MoMoGateway implements PaymentGateway {
    processPayment(amount: number): string{
        return `MoMo: processed ${amount} VND`;
    }
}

abstract class PaymentProcessor {
    abstract createGateway(): PaymentGateway;

    process(amount: number): string {
        const gateway = this.createGateway();
        return gateway.processPayment(amount);
    }
}

class VNPayProcessor extends PaymentProcessor {
    createGateway(): PaymentGateway {
        return new VNPayGateway();
    }
}

class MoMoProcessor extends PaymentProcessor {
    createGateway(): PaymentGateway {
        return new MoMoGateway();
    }
}
// ClientCode
function checkout(processor: PaymentProcessor, amount: number) {
    console.log(processor.process(amount));
}

checkout(new VNPayProcessor(), 1000000);
checkout(new MoMoProcessor(), 50000);

