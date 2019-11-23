import { Component, OnInit } from '@angular/core';
import { CommonSerService } from '../common/common-ser.service';
import { AlertSerService } from '../common/alert-ser.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserObj = {
    email : "",
    password : ""
  }
  response : any = {}
  
  constructor(
    private _commonSer : CommonSerService,
    private _alertSer : AlertSerService,
    private _route : Router,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
    }, 2000);
  }

  login(){
    this.spinner.show()
    this._commonSer.loginUser(this.loginUserObj).subscribe(
      res =>{
        this.response = res
        if(!this.response.token){
          this.spinner.hide()
          this._alertSer.errorMsg(this.response.message)
        } else {
          localStorage.setItem('token',this.response.token),
          localStorage.setItem('name',this.response.name)
          localStorage.setItem('email',this.response.email)
          localStorage.setItem('contact',this.response.contactNumber)
          localStorage.setItem('isAdmin',this.response.isAdmin)
          this._alertSer.successMsg(this.response.message)
          this.reset()
          this.spinner.hide()
          if(this.response.isAdmin){
            this._route.navigate(['adminDashboard'])
          }
          else {
            this._route.navigate(['dashboard'])
          }
          
        }
      },
      err=>{
        this.spinner.hide()
        this._alertSer.errorMsg(err.message)
        this.reset()
      }
    )
  }

  reset(){
    this.loginUserObj = {
      email : "",
      password : ""
    }
  }

}
