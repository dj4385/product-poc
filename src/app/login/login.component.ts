import { Component, OnInit } from '@angular/core';
import { CommonSerService } from '../common/common-ser.service';

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
    private _commonSer : CommonSerService
  ) { }

  ngOnInit() {
  }

  login(){
    console.log(this.loginUserObj)
    this._commonSer.loginUser(this.loginUserObj).subscribe(
      res=>{
        console.log(res)
        this.reset()
      },
      err=>{
        console.log(err)
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
