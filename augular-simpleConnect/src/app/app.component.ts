import { Component, OnInit } from '@angular/core';
import { LocalModelService } from './services/local-model.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mini-bard';
  prompt: string = '';
  response: string = '';

  constructor(private LocalModelService: LocalModelService) {}

  ngOnInit() {
    this.LocalModelService.onMessage(() => {
      console.log('Connected to Socket.IO server');
    });

    this.LocalModelService.onDisconnect(() => {
      console.log('Disconnected from Socket.IO server');
    });

    this.LocalModelService.onResponse((data: any) => {
      console.log('Response received:', data);
      this.response = JSON.stringify(data); // แปลงเป็น string เพื่อแสดงผล
    });
  }

  sendPrompt() {
    this.LocalModelService.generateContent(this.prompt).subscribe({
      next: (data) => {
        console.log('HTTP Response received:', data); // เพิ่มการแสดงผลในคอนโซล
      },
      error: (err) => console.error('HTTP Error:', err)
    });
    this.response = 'Send Prompt'
  }
}
