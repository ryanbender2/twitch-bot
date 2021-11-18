import Imap from 'imap';
import { simpleParser } from 'mailparser';

export class EmailClient {
    email: string;
    password: string;
    imap: Imap;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
        console.log(email, password);
        this.imap = new Imap({
            user: email,
            password: 'jjiymrtppulppriz',
            host: 'imap.mail.yahoo.com',
            port: 993,
            tls: true
        });
        this.imap.connect();

        console.log(this.imap);
    }


}