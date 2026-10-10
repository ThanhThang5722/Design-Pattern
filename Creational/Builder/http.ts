interface HttpRequest {
    url: string;
    method: string;
    headers: Record<string, string>;
    body?: string;
    timeout: number;
}

class HttpRequestBuilder {
    private request: HttpRequest = {
        url: "",
        method: "GET",
        headers: {},
        timeout: 5000,
    }

    setURL(url: string): this {
        this.request.url = url;
        return this;
    }

    setMethod(method: string): this {
        this.request.method = method;
        return this;
    }

    addHeader(key: string, value: string): this {
        this.request.headers[key] = value;
        return this;
    }

    setTimeout(timeout: number): this { 
        this.request.timeout = timeout;
        return this;
    }
    
    setBody(body: string): this {
        this.request.body = body;
        return this;
    }

    build(): HttpRequest {
        if(!this.request.url) throw new Error("URL is required");
        return {...this.request}
    }
}

const request = new HttpRequestBuilder()
    .setURL("https://api.example/com/users")
    .setMethod("POST")
    .addHeader("Content-Type", "application/json")
    .addHeader("Authorization", "Bearer token123")
    .setBody(JSON.stringify({name: "John"}))
    .build();