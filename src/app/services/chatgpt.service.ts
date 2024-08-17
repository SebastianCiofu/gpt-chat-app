import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { gptApiKey } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = gptApiKey;
  private http: HttpClient = inject(HttpClient)

  public sendGptMessage(message: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      temperature: 1,
      max_tokens: 256,
      top_p:1,
      frequency_penalty:0,
      presence_penalty:0,
      response_format:{
        "type": "text"
      }
    };

    return this.http.post(this.apiUrl, body, { headers })
  }
}
