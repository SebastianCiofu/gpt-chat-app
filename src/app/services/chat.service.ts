import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import {Clipboard} from '@angular/cdk/clipboard';
import { Message } from '../models/message.model';
import { S } from '@angular/cdk/keycodes';
import { Sender } from '../enums/sender.enum';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly clipboard = inject(Clipboard)

  private readonly messagesSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([])
  private readonly messages$: Observable<Message[]> = this.messagesSubject.asObservable();

  public getMessages(): Observable<Message[]> {
    return this.messages$
  }

  public sendMessage(content: string, sender: string, imageUrl?: string): void {
    const currentMessages = this.messagesSubject.value;
    const newMessage: Message = {
      id: uuidv4(),
      content,
      imageUrl: imageUrl || null,
      timestamp: Date.now(),
      sender
    };
    this.messagesSubject.next([newMessage, ...currentMessages]);
  }

  public deleteMessage(id: string): void {
    const currentMessages = this.messagesSubject.value;
    const updatedMessages = currentMessages.filter((message: Message) => message.id !== id);
    this.messagesSubject.next(updatedMessages);
  }

  public copyMessage(content: string) {
    this.clipboard.copy(content)
  }

  public uploadImage(file: File, content: string): void {
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result as string;
      this.sendMessage(content, Sender.USER, imageUrl);
    };
    reader.onerror = () => {
      console.error('Image upload failed');
    };
    reader.readAsDataURL(file);
  }
}
