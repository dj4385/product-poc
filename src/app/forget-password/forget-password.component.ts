import { Component, OnInit } from '@angular/core';
import { CommonSerService } from '../common/common-ser.service';
import { AlertSerService } from '../common/alert-ser.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  userObj : any = {
    email : ""
  }

  constructor(
    private _comSer: CommonSerService,
    private _alertSer: AlertSerService
  ) { }

  ngOnInit() {
  }
  forgetPass(){
    this._comSer.forgetPassword(this.userObj).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        this._alertSer.errorMsg(err.message)
      }
    )
  }
}
