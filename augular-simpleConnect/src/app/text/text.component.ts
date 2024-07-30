import { Component, Inject, ViewChild, OnInit } from '@angular/core';
//file config connect to NodeJS
import { LocalModelService } from '../services/local-model.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  editorEmpty: boolean = true;
  playing: boolean = false;
  response: string = '';
  //constructor of text component
  constructor(private localModelService: LocalModelService) {
    this.localModelService.onResponse((data: any) => {
      this.response = JSON.stringify(data); // แปลงเป็น string เพื่อแสดงผล
    });
  }

  editorChange(empty: boolean) {
    this.editorEmpty = empty;
  }
}
