import { Component, OnInit } from '@angular/core';
import { LocalModelService } from './services/local-model.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mini-bard';
  prompt: string = ``;
  //formatprompt: string = ``;
  response: string = '';
  formattedResponse: string = ''; // ประกาศตัวแปร formattedResponse
  formattedResponseform: string = '';
  selectedValue: number = 1;

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

  convertToNewlineString(input: string): string {
    return input.split('\n').join('\\n');
  }

  sendPrompt() {
    this.prompt = this.prompt.replace(/null/g, '').trim();
    this.prompt = this.prompt.replace(/\t/g, '|').trim();
    this.prompt = this.prompt.replace(/\s+/g, '')
    //this.prompt = this.prompt.replace(/[\r\n]+/g+'<br />', ' ').trim();
    const formatprompt = this.convertToNewlineString(this.prompt);
    // Log to verify
    console.log('Original prompt:', this.prompt);
    console.log('Sanitized prompt:', formatprompt);

    this.LocalModelService.generateContent(formatprompt).subscribe({
      next: (data) => {
        console.log('HTTP Response received:', data); // เพิ่มการแสดงผลในคอนโซล
      },
      error: (err) => console.error('HTTP Error:', err)
    });
    this.response = 'Send Prompt'
  }

  
  onSelectionChange() {
    // Use the selected value directly within the service
    this.LocalModelService.setSelectedValue(this.selectedValue);
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
      alert("Text copied to clipboard");
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


  

