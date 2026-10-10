interface Coffee {
    getDescription(): string;
    getCost(): number;
}

class Espresso implements Coffee {
    getDescription(): string { return "Expresso";}
    getCost(): number { return 20000; }
}

abstract class CoffeeDecorator implements Coffee {
    constructor(protected coffee: Coffee) {}
    abstract getDescription(): string;
    abstract getCost(): number;
}

class SugarDecorator extends CoffeeDecorator {
    getDescription(): string {
        return this.coffee.getDescription() + " , Suggar";
    }

    getCost(): number {
        return this.coffee.getCost() + 2000;
    }
}

class MilkDecorator extends CoffeeDecorator {
    getDescription(): string {
        return this.coffee.getDescription() + ", Milk";
    }
    getCost(): number {
        return this.coffee.getCost() + 5000;
    }
}

class CaramelDecorator extends CoffeeDecorator {
    getDescription(): string {
        return this.coffee.getDescription() + ", Caramel";
    }
    getCost(): number {
        return this.coffee.getCost() + 8000;
    }
}

let coffee: Coffee = new Espresso();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
coffee = new CaramelDecorator(coffee);