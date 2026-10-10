// 3rd libs
class AnalyticsLibrary {
    analyzeJSON(data: {event: string, value: number}): string {
        return `Analytics: event=${data.event}, value=${data.value}`;
    }
}

// Interface app đang dùng
interface DataAnalyzer {
    analyze(xmlData: string): string;
}

// Adapter --> Wrap code của mình
class AnalyticsAdapter implements DataAnalyzer {
    private library: AnalyticsLibrary;
    constructor() {
        this.library = new AnalyticsLibrary();
    }

    analyze(xmlData: string): string {
        // parse XML to JSON
        const json = this.parseXML(xmlData);
        return this.library.analyzeJSON(json);
    }    
    private parseXML(xml: string): {event: string; value: number} {
        // <event name="click" value="5"/>  →  { event: "click", value: 5 }
        const event = xml.match(/name="(\w+)"/)?.[1] ?? "";
        const value = Number(xml.match(/value="(\d+)"/)?.[1] ?? 0);
        return {event, value};
    }
}

// client code
function trackEvent(analyzer: DataAnalyzer, xmlData: string): void {
    console.log(analyzer.analyze(xmlData));
}

const adapter = new AnalyticsAdapter();
trackEvent(adapter, `<event name="click" value="5"/>`);
