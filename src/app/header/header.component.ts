import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userInfo = {
    name : "",
    email : "",
    token : ""
  }
  
  constructor(
    private _router : Router
  ) { }

  ngOnInit() {
    this.getLoginUserInfo()
  }
  getLoginUserInfo(){
    this.userInfo.name = localStorage.getItem('name')
    this.userInfo.email = localStorage.getItem('email')
    this.userInfo.token = localStorage.getItem('token')
  }

  logout(){
    localStorage.clear();
    this._router.navigate(['login'])
  }
}
