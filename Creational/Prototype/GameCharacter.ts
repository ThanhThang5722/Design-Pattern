interface Cloneable<T> {
    clone(): T;
}

class GameCharacter implements Cloneable<GameCharacter> {
    constructor(
        public name: string,
        public class_: string,
        public hp: number,
        public attack: number,
        public defense: number,
        public skills: string[]
    ) {}

    clone(): GameCharacter {
        return new GameCharacter(
            this.name,
            this.class_,
            this.hp,
            this.attack,
            this.defense,
            [...this.skills]
        );
    }
}

const warriorTemplate = new GameCharacter("Warrior", "warior", 200, 80, 60, ["Slash", "Shield Bash"]);

const player1 = warriorTemplate.clone();
player1.name = "Thor";

const player2 = warriorTemplate.clone();
player2.name = "Kratos";
player2.hp = 220;