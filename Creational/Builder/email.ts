interface EmailNotification {
    to: string;
    subject: string;
    body: string;
    cc?: string[];
    bcc?: string[];
    attachments?: string[];
    isHtml?: boolean;
}

class EmailNotificationBuilder {
    private emailNotification: EmailNotification = {
        to: "",
        subject: "",
        body: ""
    }

    setTo(to: string): this {
        this.emailNotification.to = to;
        return this;
    }

    setSubject(subject: string): this {
        this.emailNotification.subject = subject;
        return this;
    }

    setBody(body: string): this {
        this.emailNotification.body = body;
        return this;
    }

    addCc(cc: string): this {
        if(!this.emailNotification.cc) {
            this.emailNotification.cc = [];
        }
        this.emailNotification.cc?.push(cc);
        return this;
    }

    addBcc(bcc: string): this {
        if(!this.emailNotification.bcc) {
            this.emailNotification.bcc = [];
        }
        this.emailNotification.bcc?.push(bcc);
        return this;
    }

    addAttachment(file: string): this {
        if(!this.emailNotification.attachments) {
            this.emailNotification.attachments = [];
        }
        this.emailNotification.attachments?.push(file);
        return this;
    }

    setIsHTML(isHtml: boolean): this {
        this.emailNotification.isHtml = isHtml;
        return this;
    }

    build(): EmailNotification {
        if(!this.emailNotification.to) throw new Error("'to' is required");
        if(!this.emailNotification.subject) throw new Error("'subject' is required");
        if(!this.emailNotification.body) throw new Error("'body' is required");
        return {... this.emailNotification}
    }
}

const simpleMail = new EmailNotificationBuilder()
    .setTo("james")
    .setSubject("learn Builder Pattern")
    .setBody("learned")
    .build();

const completeMail = new EmailNotificationBuilder()
    .setTo("james")
    .setSubject("learn Builder Pattern")
    .setBody("learned")
    .addCc("christian")
    .addBcc("bao")
    .addAttachment("text.txt")
    .setIsHTML(true)
    .build();

    