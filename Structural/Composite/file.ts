interface FileSystemItem {
    getName(): string;
    getSize(): number;
    print(indent?: string): void;
}

class MyFile implements FileSystemItem {
    constructor(private name: string, private size: number) {}

    getName(): string { return this.name; }
    getSize(): number { return this.size }

    print(indent = ""): void {
        console.log(`${indent} ${this.name} (${this.size}KB)`);
    }
}

class MyFolder implements FileSystemItem {
    private children: FileSystemItem[] = [];
    constructor(private name: string) {}

    addFile(file: FileSystemItem): this {
        this.children.push(file);
        return this;
    }
    getName(): string {return this.name};

    getSize(): number {
        return this.children.reduce((total, file) => total + file.getSize(), 0);
    }

    print(indent?: string): void {
        console.log(`${indent} ${this.name} (${this.getSize()}KB)`);
        this.children.forEach(child => child.print(indent + " "));
    }
}

// Client
const root = new MyFolder("root");
const docs = new MyFolder("documents");
const images = new MyFolder("images");

images.addFile(new MyFile("photo.jpg", 100));
docs.addFile(new MyFile("report.pdf", 50)).addFile(images);
root.addFile(new MyFile("file1.txt", 10))
    .addFile(new MyFile("file2.txt", 20))
    .addFile(docs);

root.print();
console.log("Total:", root.getSize(), "KB");
