import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path:'',redirectTo:"home",pathMatch: 'full'},
  {path:'home', component:HomeComponent,},
  { path: 'cities', loadChildren: () => import('./cities/cities.module').then(m => m.CitiesModule)},
  { path: 'restaurents', loadChildren: () => import('./restaurents/restaurents.module').then(m => m.RestaurentsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
