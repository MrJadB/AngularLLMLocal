import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
//import { environment } from '../../environments/environment.development';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class LocalModelService {
  private socket: Socket;

  constructor(private http: HttpClient) {
    //this.socket = io('http://localhost:3000', {
   //edit address
    this.socket = io('http://54.84.200.3:3000', {
      withCredentials: true,
    });
    // ตรวจสอบสถานะการเชื่อมต่อ
    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });
  }
  //send command to NodeJS
  generateContent(prompt: string): Observable<any> {
    //return this.http.post('http://localhost:3000/api/generate-content', { query_str: prompt });
    //edit address
    return this.http.post('http://54.84.200.3:3000/api/generate-content', { query_str: prompt });
  }
  //Get data Back from NodeJS
  onResponse(callback: (data: any) => void) {
    this.socket.on('response', callback);
  }

  onMessage(callback: () => void) {
    this.socket.on('message', callback);
  }
  //disconnect to server
  onDisconnect(callback: () => void) {
    this.socket.on('disconnect', callback);
  }
}
