import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { PostComponent } from './program/post/post.component'
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './login/signup/signup.component';
import { MyInfoComponent } from './program/my-info/my-info.component';
const routes: Routes = [
  {
    path: '',
    component:LoginComponent
  },
  {
    path: 'signup',
    component:SignupComponent
  },
  {
    path: 'home',
    component:HomeComponent, children: [
      {
        path:'post',
        component:PostComponent
      },
      {
        path:'infomation',
        component:MyInfoComponent
      },
      {
        path:'**',
        component:PostComponent
      }
    ]
  },
  {
    path: '**',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
