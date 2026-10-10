// Flyweight
class TreeType {
    constructor(
        readonly name: string,
        readonly color: string,
        readonly texture: string
    ) {}

    draw(x: number, y: number): void {
        console.log(`Drawing ${this.name} [${this.color}] at (${x}, ${y})`);
    }
}

// Flyweight Factory
class TreeTypeFactory {
    private static pool: Map<string, TreeType> = new Map();
    static get(name: string, color: string, texture: string): TreeType {
        const key = `${name}-${color}-${texture}`;
        if(!this.pool.has(key)) {
            this.pool.set(key, new TreeType(name, color, texture));
            console.log(`Created new TreeType: ${key}`);
        }
        return this.pool.get(key)!;
    }
    static count(): number { return this.pool.size; }
}

class Tree {
    constructor(
        private x: number,
        private y: number,
        private type: TreeType
    ) {}
    draw(): void { this.type.draw(this.x, this.y)}
}

// Client code
const trees: Tree[] = [];
for(let i = 0; i < 5; i++) {
    const type = TreeTypeFactory.get("Oak", "green", "oak-texture.png");
    trees.push(new Tree(i * 100, i * 20, type));
}

for(let i = 0; i < 3; i++) {
    const type = TreeTypeFactory.get("Pine", "dark-green", "pine-texture.png");
    trees.push(new Tree(i*15, i * 25, type));
}

trees.forEach(t => t.draw());
console.log(`TreeType objects in pool: ${TreeTypeFactory.count()}`);