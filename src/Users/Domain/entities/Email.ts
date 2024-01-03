export class Email{
    to: string;
    from: string;
    subject: string;
    message: string;

    constructor(to: string, from: string, subject: string, message: string){
        this.to = to;
        this.from = from;
        this.subject = subject;
        this.message = message;
    }
}
