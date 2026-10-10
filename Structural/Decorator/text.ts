// Component Interface
interface TextProcessor {

    process(): string;
}
// Concrete Component
class PlainText implements TextProcessor {
    constructor(protected text: string) {}
    process(): string {
        return this.text;
    }
}
// Base Decorator
abstract class TextDecorator implements TextProcessor{
    constructor(protected plainText: TextProcessor){}
    abstract process(): string;
}
// Concrete Decorator
class UpperCaseDecorator extends TextDecorator {
    process(): string {
        return this.plainText.process().toLocaleUpperCase('en');
    }
}

class TrimDecorator extends TextDecorator {
    process(): string {
        return this.plainText.process().trim();
    }
}

class ExclamationDecorator extends TextDecorator {
    process(): string {
        return this.plainText.process() + "!";
    }
}
// Ví dụ 1: Trim → UpperCase → Exclamation
let t1: TextProcessor = new PlainText("  hello world  ");
t1 = new TrimDecorator(t1);
t1 = new UpperCaseDecorator(t1);
t1 = new ExclamationDecorator(t1);
console.log(t1.process()); // "HELLO WORLD!"

// Ví dụ 2: UpperCase → Trim → Exclamation
let t2: TextProcessor = new PlainText("  hello world  ");
t2 = new UpperCaseDecorator(t2);
t2 = new TrimDecorator(t2);
t2 = new ExclamationDecorator(t2);
console.log(t2.process()); // "HELLO WORLD!"  — kết quả giống hay khác?
