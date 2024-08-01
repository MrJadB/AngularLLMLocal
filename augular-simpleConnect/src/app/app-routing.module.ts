import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
import { TextComponent } from './text/text.component';

const routes: Routes = [
  { path: 'text', component: TextComponent, data: { title: 'Text' } },
  { path: '', redirectTo: '/text', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
