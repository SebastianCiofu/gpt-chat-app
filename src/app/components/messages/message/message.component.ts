import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() public message: any

  private readonly chatService = inject(ChatService)

  public deleteMessage(id: string): void {
    this.chatService.deleteMessage(id)
  }

  public copyText(content: string): void {
    this.chatService.copyMessage(content)
  }
}
