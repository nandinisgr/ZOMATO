import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CitiesComponent } from './cities.component';

export const routes = [
  { path: '', component: CitiesComponent, pathMatch: 'full' },
  { path: ':obj', component: CitiesComponent },
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CitiesModule { }
