// Command Interface
interface Command {
    execute(): void;
    undo(): void;
}
// Receiver
class TextEditor {
    private content = "";

    getContent(): string { return this.content; }

    insertText(text: string): void { this.content += text; }
    deleteText(length: number): void {
        this.content = this.content.slice(0, -length);
    }
}

// Concrete Commands
class InsertCommand implements Command {
    constructor(private editor: TextEditor, private text: string) {}

    execute(): void {
        this.editor.insertText(this.text);
    }
    undo(): void {
        this.editor.deleteText(this.text.length);
    }
}

class CommandHistory {
    private history: Command[] = [];

    execute(command: Command): void {
        command.execute();
        this.history.push(command);
    }
    undo(): void {
        const command = this.history.pop();
        command?.undo();
    }
}

// Client Code
const editor = new TextEditor();
const myHistory = new CommandHistory();

myHistory.execute(new InsertCommand(editor, "Hello"));
myHistory.execute(new InsertCommand(editor, " World"));
console.log(editor.getContent()); // "Hello World"

myHistory.undo();
console.log(editor.getContent()); // "Hello"

myHistory.undo();
console.log(editor.getContent()); // ""