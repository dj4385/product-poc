import { Component, OnInit } from '@angular/core';
import { CommonSerService } from '../common/common-ser.service';
import { AlertSerService } from '../common/alert-ser.service';

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
  constructor(
    private _commonSer : CommonSerService,
    private _alertSer : AlertSerService
  ) { }

  ngOnInit() {
  }

  login(){
    console.log(this.loginUserObj)
    this._commonSer.loginUser(this.loginUserObj).subscribe(
      res=>{
        console.log(res)
        this._alertSer.successMsg(res)
        this.reset()
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
