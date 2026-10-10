interface MyIterator<T> {
    hasNext(): boolean;
    next(): T;
}

interface IterableCollection<T> {
    createIterator(): MyIterator<T>;
}

class NumberRange implements IterableCollection<number> {
    private items: number[] = [];

    add(n: number): this {
        this.items.push(n);
        return this;
    }

    createIterator(): MyIterator<number> {
        return new NumberRangeIterator(this.items);
    }

    createStepIterator(step: number): MyIterator<number> {
        return new StepIterator(this.items, step);
    }
}

class NumberRangeIterator implements MyIterator<number> {
    private index = 0;
    constructor(private items: number[]) {}
    hasNext(): boolean {return this.index < this.items.length;}
    next(): number { return this.items[this.index++]; }
}

class StepIterator implements MyIterator<number> {
    private index = 0;

    constructor(private items: number[], private step: number) {}
    hasNext(): boolean {
        return this.index < this.items.length;
    }
    next(): number {
        const val = this.items[this.index];
        this.index += this.step;
        return val;
    }
}