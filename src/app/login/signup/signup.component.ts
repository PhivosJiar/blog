import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const Parse = require('parse');
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  errCode: string = '';
  account: string = '';
  password: string = '';
  constructor(
    private route: Router,
  ) { }

  ngOnInit(): void {

  }
  signup() {
    this.errCode=''
    if (this.account.trim() != '' && this.password.trim() != '') {
      let user = new Parse.User();
      user.set("username", this.account);
      user.set("password", this.password);
      user.signUp().then(() => {
        this.route.navigate(['/']);
      }, (error: any) => {
        console.log(error)
        if (error = 'Account already exists for this username.') {
          this.errCode = '帳號已存在';
        }
      });
    }else{
      this.errCode='帳號或密碼為空'
    }
  }
}
