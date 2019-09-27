import { Component, OnInit } from '@angular/core';

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
  
  constructor() { }

  ngOnInit() {
    this.getLoginUserInfo()
  }
  getLoginUserInfo(){
    this.userInfo.name = localStorage.getItem('name')
    this.userInfo.email = localStorage.getItem('email')
    this.userInfo.token = localStorage.getItem('token')
  }

}
