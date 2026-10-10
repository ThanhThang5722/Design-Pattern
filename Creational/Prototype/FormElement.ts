interface CloneableWithId<T> {
    clone: (id: string) => T;
}

class FormElement implements CloneableWithId<FormElement> {
    constructor(
        private id: string,
        public text: string,
        public type: "text" | "multiple_choice" | "rating",
        public required: boolean,
        public options?: string[]
    ){}
    clone(id: string): FormElement {
        return new FormElement(
            id,
            this.text,
            this.type,
            this.required,
            this.options ? [...this.options] : undefined
        );
    }

    public addOption(option: string): this {
        if(!this.options) {
            this.options = [];
        }
        this.options.push(option)
        return this;
    }
}

const template = new FormElement("q0", "Bạn thích màu nào?", "multiple_choice", true, ["Đỏ", "Xanh"]);

const q1 = template.clone("q1");
q1.text = "Bạn thích trái cây nào?";

const q2 = template.clone("q2");
q2.text = "Bạn thích môn thể thao nào?";
q2.addOption("Vàng");

console.log(template.options); // ["Đỏ", "Xanh"] — không bị ảnh hưởng ✅
console.log(q1.options);       // ["Đỏ", "Xanh"]
console.log(q2.options);       // ["Đỏ", "Xanh", "Vàng"]