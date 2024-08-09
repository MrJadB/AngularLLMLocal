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
  private selectedValue: number = 1;

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


  setSelectedValue(value: number) {
    this.selectedValue = value;
    console.log('Selected value set in service:', this.selectedValue);
    // Additional logic to use the selected value
  }

  getSelectedValue(): number {
    return this.selectedValue;
  }

  //send command to NodeJS
  generateContent(prompt: string): Observable<any> {
    if(this.selectedValue == 3){
      return this.http.post('http://54.84.200.3:3000/api/generate-content', { query_str: `curl -X POST http://3.224.6.184:8091/query -H "Content-Type: application/json" -d '{"query_str": "${prompt}"}' ` });
    }
    else if(this.selectedValue == 2){
      return this.http.post('http://54.84.200.3:3000/api/generate-content', { query_str:`curl -X POST http://44.223.200.55:7869/api/generate \ -d '{ 
        "model": "gemma2:2b", 
        "prompt": "${prompt}",
        "stream": false, 
        "context_length": 1024, 
        "Temperature": 0.2, 
        "stop": [""], 
        "top_p": 0.95, 
        "verbose": false, 
        "repetition_penalty": 1.25, 
        "do_sample": true 
      }' | jq '. | {response, created_at}'` });
      //return this.http.post('http://54.84.200.3:3000/api/generate-content',{query_str: `curl -X POST http://44.223.200.55:7869/api/generate -d '{  "model": "llama3.1",  "prompt":"${prompt}" }'" }'`});

    }
    else if(this.selectedValue == 1){
      return this.http.post('http://54.84.200.3:3000/api/generate-content', { query_str:`curl -X POST http://44.223.200.55:7869/api/generate \ -d '{ 
        "model": "llama3.1", 
        "prompt": "${prompt}",
        "stream": false,
        "context_length": 1024, 
        "Temperature": 0.2, 
        "stop": [""], 
        "top_p": 0.95, 
        "verbose": false, 
        "repetition_penalty": 1.25, 
        "do_sample": true 
      }' | jq '. | {response, created_at}'` });
      //return this.http.post('http://54.84.200.3:3000/api/generate-content',{query_str: `curl -X POST http://44.223.200.55:7869/api/generate -d '{  "model": "llama3.1",  "prompt":"${prompt}" }'" }'`});

    }

    else {
      return this.http.post('http://54.84.200.3:3000/api/generate-content', { query_str:`curl -X POST http://44.223.200.55:7869/api/generate -d '{\ 
        "model": "rajivmehtapy/natural-sql",\ 
        "prompt": "${prompt}",\
        "stream": false,\ 
        "context_length": 1024,\ 
        "Temperature": 0.2,\ 
        "stop": [""],\ 
        "top_p": 0.95,\ 
        "verbose": false,\ 
        "repetition_penalty": 1.25,\ 
        "do_sample": true\ 
      }' | jq '. | {response, created_at}'` });
      //return this.http.post('http://54.84.200.3:3000/api/generate-content',{query_str: `curl -X POST http://44.223.200.55:7869/api/generate -d '{  "model": "llama3.1",  "prompt":"${prompt}" }'" }'`});

    }
    //edit address
    //return this.http.post('http://54.84.200.3:3000/api/generate-content', { query_str: prompt });
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
