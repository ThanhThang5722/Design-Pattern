interface Button {
    render(): string;
}

interface Input {
    render(): string;
}

// Concrete
class LightButton implements Button {
    render(): string {
        return "[ Light Button ]";
    }
}

class LightInput implements Input {
    render(): string {
        return " [Light Input]";
    }
}

class DarkButton implements Button {
    render(): string {
        return "[ Dark Button]";
    }
}

class DarkInput implements Input {
    render(): string {
        return "[ Dark Input]";
    }
}

// Abstract Factory
interface UIFactory {
    createButton(): Button;
    createInput(): Input;
}

// Concrete Factory
class LightThemeFactory implements UIFactory {
    createButton(): Button {
        return new LightButton();
    }
    createInput(): Input {
        return new LightInput();
    }
}

class DarkThemeFactory implements UIFactory {
    createButton(): Button {
        return new DarkButton();
    }
    createInput(): Input {
        return new DarkInput();
    }
}

// Client Code
function renderForm(factory: UIFactory): void {
    const button = factory.createButton();
    const input = factory.createInput();
    console.log(button.render());
    console.log(input.render());
}

const theme = "dark";
const factory = theme === "dark" ? new DarkThemeFactory() : new LightThemeFactory();

renderForm(factory);
