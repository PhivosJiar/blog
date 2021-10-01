import { Component, OnInit } from '@angular/core';
import { Router }          from '@angular/router';

const Parse = require('parse');
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  account:string='';
  password:string='';
  constructor( 
    private route: Router,
    ) { }

  ngOnInit(): void {
    
  }
  signup(){
    let user = new Parse.User();
    user.set("username", this.account);
    user.set("password", this.password);
    user.signUp().then(()=>{
      this.route.navigate(['/']);
    });

  }
}
