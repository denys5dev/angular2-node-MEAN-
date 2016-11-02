import { Component, OnInit } from '@angular/core';

import { MessageService } from './message.service';
import { Message } from './message.model';
import * as io from "socket.io-client";

@Component({
    selector: 'app-message-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <app-message
			 	[message]="message"
				*ngFor = "let message of messages">
			</app-message>
        </div>
    `
})

export class MessageListComponent implements OnInit {
    socket = io.connect();
    messages: Message[];
    constructor(private messageService: MessageService) {

    }

    ngOnInit() {
        this.socket.on('update', (message) => {
            this.messageService.getMessage()
                .subscribe(
                (messages: Message[]) => {
                    this.messages = messages;
                });
        })

        this.messageService.getMessage()
            .subscribe(
            (messages: Message[]) => {
                this.messages = messages;
            });
    }
}