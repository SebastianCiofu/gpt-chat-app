import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { Sender } from '../../../enums/sender.enum';
import { Message } from '../../../models/message.model';
import { ChatService } from '../../../services/chat.service';
import { ChatGptService } from '../../../services/chatgpt.service';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.scss',
})
export class NewMessageComponent {
  @ViewChild('fileInput') public fileInput!: ElementRef;

  private readonly chatService = inject(ChatService);
  private readonly chatGptService = inject(ChatGptService);

  public sendOnEnter = true;
  public loading = false;
  public userInput: string = '';

  public sendMessage() {
    if (this.userInput.trim() === '') {
      return;
    }
    this.loading = true;

    setTimeout(() => {
      const userMessage = this.userInput;
      this.chatService.sendMessage(userMessage, Sender.USER );
      this.userInput = '';
      this.loading = false;

      this.chatGptService.sendGptMessage(userMessage).subscribe((response: any) => {
        const botMessage = response.choices[0].message.content;
        this.chatService.sendMessage(botMessage, Sender.BOT);
      });
    }, 300);
  }

  public onEnterKey(event: Event) {
    if (this.sendOnEnter) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  public triggerImageUpload(): void {
    this.fileInput.nativeElement.value = '';
    this.fileInput.nativeElement.click();
  }

  public onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file: File = fileInput.files![0];
    this.chatService.uploadImage(file, this.userInput);
  }
}
