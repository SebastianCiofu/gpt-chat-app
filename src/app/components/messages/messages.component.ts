import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NewMessageComponent } from './new-message/new-message.component';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { EmptyComponent } from './empty/empty.component';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    NewMessageComponent,
    MessageComponent,
    EmptyComponent
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  private readonly chatService = inject(ChatService);

  public readonly messages$: Observable<Message[]> = this.chatService.getMessages();
}
