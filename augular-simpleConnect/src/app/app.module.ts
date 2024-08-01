import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { environment } from '../environments/environment.development';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
//make page can have side bar
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TextComponent } from './text/text.component';

import { MarkdownModule, MARKED_OPTIONS, MarkedOptions, MarkedRenderer, CLIPBOARD_OPTIONS } from 'ngx-markdown';
import { QuillModule } from 'ngx-quill';

import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {LocalModelService} from './services/local-model.service'


// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();
  const linkRenderer = renderer.link;
  renderer.link = (href, title, text) => {
    let target = `target="_blank"`;
    const isSVG = text.lastIndexOf("svg") >= 0;
    if (isSVG) {
      target = ` target="" `;
    }
    const html = linkRenderer.call(renderer, href, title, text);
    return html.replace(/^<a /, `<a role="link" tabindex="0" ${target} rel="nofollow noopener noreferrer" `);
  };

  return {
    renderer,
  };
}

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    TextFieldModule,
    MatProgressSpinnerModule,
    FormsModule,

    QuillModule.forRoot(),
    FormsModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
    LocalModelService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
