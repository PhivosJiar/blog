import { Component, OnInit } from '@angular/core';
import { Router }          from '@angular/router';
const Parse = require('parse');
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private route: Router,
  ) { }

  ngOnInit(): void {
    const currentUser = Parse.User.current();
    if (!currentUser) {
      this.route.navigate(['/']);
    } else {
  
    }
  }
  logout(){
    Parse.User.logOut().then(() => {
      this.route.navigate(['/login']);
  })
  }
}
