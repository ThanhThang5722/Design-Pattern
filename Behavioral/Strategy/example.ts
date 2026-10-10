interface Product { name: string, price: number, createdAt: number; }

// Strategy interface
interface SortStrategy {
    sort(products: Product[]): Product[];
}

// Concrete Strategies
class PriceAscStrategy implements SortStrategy {
    sort(products: Product[]): Product[] {
        return [...products].sort((a,b) => a.price - b.price);
    }
}
class PriceDscStrategy implements SortStrategy {
    sort(products: Product[]): Product[] {
        return [...products].sort((a,b) => b.price - a.price);
    }
}
class NameAZStrategy implements SortStrategy {
    sort(products: Product[]): Product[] {
        return [...products].sort((a,b) => a.name.localeCompare(b.name));
    }
}

// Context
class ProductList {
    private strategy: SortStrategy = new PriceAscStrategy();

    constructor(private products: Product[]) {}

    setStrategy(strategy: SortStrategy): void {
        this.strategy = strategy;
    }

    getSorted(): Product[] {
        return this.strategy.sort(this.products);
    }
}

// Client code
const products: Product[] = [
    { name: "Mouse", price: 30, createdAt: 3 },
    { name: "Keyboard", price: 50, createdAt: 1 },
    { name: "Monitor", price: 200, createdAt: 2 },
];

const list = new ProductList(products);
list.setStrategy(new PriceAscStrategy());
console.log(list.getSorted().map(p => `${p.name}:$${p.price}`));

list.setStrategy(new PriceDscStrategy());
console.log(list.getSorted().map(p => `${p.name}:$${p.price}`));


