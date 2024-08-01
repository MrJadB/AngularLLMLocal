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
  formattedResponse: string = ''; // ประกาศตัวแปร formattedResponse
  formattedResponseform: string = '';

  constructor(private LocalModelService: LocalModelService) {
    this.LocalModelService.onResponse((data: any) => {
      this.response = data;
      this.formatResponse();
    });
  }

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

  copyToClipboard() {
    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';  // Prevent scrolling to bottom of page in Microsoft Edge.
    textarea.style.opacity = '0'; // Invisible textarea
    textarea.textContent = this.response;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy'); // Copy text to clipboard
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text', err);
    }
    document.body.removeChild(textarea);
  }

  formatResponse() {
    // แปลง JSON object เป็น string ที่อ่านง่าย
    this.formattedResponse = JSON.stringify(this.response, null, 2);
      // แปลง JSON object เป็น string ที่อ่านง่าย
    this.formattedResponseform = this.formattedResponse.replace(/\\n/g, '<br/>');
}
}
