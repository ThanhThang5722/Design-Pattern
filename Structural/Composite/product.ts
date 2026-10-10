interface Component {
    getName(): string,
    getPrice(): number,
}

class Product implements Component {
    constructor(private name: string, private price: number) {}

    getName(): string {
        return this.name;
    }
    getPrice(): number {
        return this.price;
    }
}

class Bundle implements Component {
    private components: Component[] = [];
    constructor(private name: string, private discount: number) {}
    add(component: Component): this {
        this.components.push(component);
        return this;
    }
    getName(): string { return this.name}
    getPrice(): number {
        const rawValue = this.components.reduce((total, component) => total + component.getPrice(), 0);
        return rawValue - this.discount;
    }
}

const Order = new Bundle("Order", 0);
const keyboard = new Product("keyboard", 50);
const mouse = new Product("mouse", 30);
const MonitorBundle = new Bundle("Monitor Bundle", 20);
const monitor = new Product("monitor", 200);
const CableBundle = new Bundle("Cable Bundle", 5);
const hdmi = new Product("HDMI Cable", 15);
const power = new Product("Power Cable", 10);

CableBundle.add(hdmi).add(power);
MonitorBundle.add(monitor).add(CableBundle);
Order.add(keyboard).add(mouse).add(MonitorBundle);

console.log(Order.getPrice());