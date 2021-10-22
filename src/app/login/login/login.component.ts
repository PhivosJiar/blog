import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const Parse = require('parse');
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errCode: string = '';
  account: string = '';
  password: string = '';
  constructor(
    private route: Router,
  ) { }

  ngOnInit(): void {
    const currentUser = Parse.User.current();
    if (currentUser) {
      this.route.navigate(['/home']);
    } else {

    }
  }

  async login() {
    this.errCode = ''
    if (this.account.trim() != '' && this.password.trim() != '') {
      await Parse.User.logIn(this.account, this.password).then(() => {
        console.log("success");
        this.route.navigate(['/home']);
      }, (error: any) => {
        console.log(error)
        if (error = 'Invalid username/password.') {
          this.errCode = '帳號或密碼錯誤';
        }
      });
      //123∂
    } else {
      this.errCode = '帳號或密碼為空'
    }
  }

}
