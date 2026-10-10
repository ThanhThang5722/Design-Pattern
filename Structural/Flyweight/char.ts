// Flyweight
class CharacterStyle {
    constructor(
        protected char: string,
        protected font: string,
        protected  size: number
    ) {}

    draw(x: number, y: number): void {
        console.log(`Drawing ${this.char} [${this.font}] ${this.size} at (${x}, ${y})`);
    }
}
// Flyweight factory
class CharacterFactory {
    private static pool: Map<string, CharacterStyle>  = new Map();
    static get(char: string, font: string, size: number): CharacterStyle{
        const key = `${char}-${font}-${size}`;
        if(!this.pool.has(key)) {
            this.pool.set(key, new CharacterStyle(char, font, size));
            console.log(`Created new CharacterStyle`);
        }
        return this.pool.get(key)!;
    }

    static count(): number { return this.pool.size;}
}
// Type
class Character {
    constructor(
        private x: number,
        private y: number,
        private style: CharacterStyle
    ) {}

    draw(): void {
        this.style.draw(this.x, this.y);
    }
}
// Client Code
const char: Character[] = [];
const type1 = CharacterFactory.get("H", "Arial", 12);
char.push(new Character(1, 2, type1));

const type2 = CharacterFactory.get("e", "Arial", 12);
char.push(new Character(1, 2, type2));

const type3 = CharacterFactory.get("l", "Arial", 12);
char.push(new Character(1, 2, type3));

const type4 = CharacterFactory.get("l", "Arial", 12);
char.push(new Character(1, 2, type4));

const type5 = CharacterFactory.get("0", "Arial", 12);
char.push(new Character(1, 2, type5));

char.forEach(t => t.draw());
console.log(`CharStyle objects in pool: ${CharacterFactory.count()}`);
