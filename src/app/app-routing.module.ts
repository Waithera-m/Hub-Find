import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  {path:'profiles', component: ProfilesComponent},
  {path:'', redirectTo:"/profiles", pathMatch:"full"},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
