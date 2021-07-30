import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurentsComponent } from './restaurents.component';
import { RouterModule } from '@angular/router';

export const routes = [
  { path: '', component: RestaurentsComponent, pathMatch: 'full' },
  { path: ':obj', component: RestaurentsComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RestaurentsModule { }
