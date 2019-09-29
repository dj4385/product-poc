import { Component, OnInit } from '@angular/core';
import { CommonSerService } from '../common/common-ser.service';
import { AlertSerService } from '../common/alert-ser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regUserObj = {
    name : "",
    email : "",
    password : ""
  }

  constructor(
    private _commonSer : CommonSerService,
    private _alertSer : AlertSerService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  register(){
    console.log(this.regUserObj)
    this._commonSer.registerUser(this.regUserObj).subscribe(
      res=>{
        console.log(res)
        this.reset()
        this._alertSer.successMsg("User Created Successfully")
        this._router.navigate(['login'])
      },
      err=>{
        console.log(err)
        this.reset()
        this._alertSer.errorMsg(err.message)
      }
    )
  }

  reset(){
    this.regUserObj = {
      name : "",
      email : "",
      password : ""
    }
  }
}
