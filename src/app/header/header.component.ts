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
    token : "",
    isAdmin: ""
  }

  productArr = []
  isLoginInfoExist = false
  isAdminLoggedIn = false
  navbarOpen = false
  dropdownOpen = false
  
  constructor(
    private _router : Router
  ) { }

  ngOnInit() {
    this.getLoginUserInfo()
  }
  getLoginUserInfo(){
    if(localStorage.length !== 0){
      this.isLoginInfoExist = true
      this.userInfo.name = localStorage.getItem('name')
      this.userInfo.email = localStorage.getItem('email')
      this.userInfo.token = localStorage.getItem('token')
      this.userInfo.isAdmin = localStorage.getItem('isAdmin')

      if(this.userInfo.isAdmin === "true"){
        this.isAdminLoggedIn = true
      } else {
        this.isAdminLoggedIn =false
      }
    } else {
      this.isLoginInfoExist = false
    }
    
  }

  toggleNavBar(){
    this.navbarOpen = !this.navbarOpen
  }

  toggleDropdown(){
    this.dropdownOpen = !this.dropdownOpen
  }

  logout(){
    this.isLoginInfoExist = false
    this.isAdminLoggedIn = false
    localStorage.clear();
    this._router.navigate(['Home'])
  }
  
  searchProduct(event){
    let searchKey = event.target.value
    if(searchKey !== ""){
      this.productArr.forEach(element => {
        if(element.productName.toLowerCase() === searchKey.toLowerCase()){
          this.productArr = []
          this.productArr.push(element)
        }
      });
    }
    // else{
    //   this.getAllProdcuts()
    // }
  }

  toggleDashboard(){
    if(this.isAdminLoggedIn){
      this._router.navigate(['adminDashboard'])
    } else if(this.isAdminLoggedIn === false) {
      this._router.navigate(['dashboard'])
    } else {
      this._router.navigate(['Home'])
    }
  }

}
