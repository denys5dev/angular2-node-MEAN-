import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Message } from './message.model';

@Injectable()
export class MessageService {

    private messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    serverEntryPoint: string = 'http://localhost:3000/';
    constructor(private http: Http) {

    }

    addMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.serverEntryPoint + 'message', body, {
            headers: headers
        })
            .map((response: Response) => { 
                const result = response.json();
                const message = new Message(result.obj.content, 'Dummy', result.obj._id, null);
                this.messages.push(message);
                return message;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getMessage() {
        return this.http.get(this.serverEntryPoint + 'message')
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMessages: Message[] = [];
                for (let message of messages) {
                    transformedMessages.push(new Message(message.content, 'Dummy', message._id, null))
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    updateMessge(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.patch(this.serverEntryPoint + 'message/' + message.messageId, body, {
            headers: headers
        })
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()
        ));
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1));
        return this.http.delete( this.serverEntryPoint + 'message/' + message.messageId )
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()
        ));
    }
}