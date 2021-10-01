import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { PostComponent } from './program/post/post.component'
import * as Parse from 'parse';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './login/signup/signup.component';
import { MyInfoComponent } from './program/my-info/my-info.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    LoginComponent,
    SignupComponent,
    MyInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
