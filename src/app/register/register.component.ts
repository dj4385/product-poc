import { Component, OnInit } from '@angular/core';
import { CommonSerService } from '../common/common-ser.service';
import { AlertSerService } from '../common/alert-ser.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';



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
    private _router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show()
    setTimeout(()=>{
      this.spinner.hide()
    },2000)
  }

  register(){
    this.spinner.show()
    this._commonSer.registerUser(this.regUserObj).subscribe(
      res=>{
        console.log(res)
        this.reset()
        this.spinner.hide()
        this._alertSer.successMsg("User Created Successfully")
        this._router.navigate(['login'])
      },
      err=>{
        this.reset()
        this.spinner.hide()
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
