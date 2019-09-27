import { Component, OnInit } from '@angular/core';
import { CommonSerService } from '../common/common-ser.service';
import { AlertSerService } from '../common/alert-ser.service';
import { Router } from '@angular/router';

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
    private _route : Router
  ) { }

  ngOnInit() {
  }

  login(){
    this._commonSer.loginUser(this.loginUserObj).subscribe(
      res =>{
        this.response = res
        if(!this.response.token){
          this._alertSer.errorMsg(this.response.message)
        } else {
          localStorage.setItem('token',this.response.token),
          localStorage.setItem('name',this.response.name)
          localStorage.setItem('email',this.response.email)
          this._alertSer.successMsg(this.response.message)
          this.reset()
          this._route.navigate(['dashboard'])
        }
      },
      err=>{
        console.log(err)
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
