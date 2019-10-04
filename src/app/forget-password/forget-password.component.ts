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
  
  response : any = {}

  constructor(
    private _comSer: CommonSerService,
    private _alertSer: AlertSerService
  ) { }

  ngOnInit() {
  }
  forgetPass(){
    this._comSer.forgetPassword(this.userObj).subscribe(
      res=>{
        if(res){
          this.response = res
          if(this.response.status === 200){
            this._alertSer.successMsg(this.response.message)
            this.reset()
          } else if(this.response.status === 400){
            this._alertSer.errorMsg(this.response.message)
          } else {
            this._alertSer.errorMsg(this.response.message)
          }
        }
      },
      err=>{
        this._alertSer.errorMsg(err.message)
      }
    )
  }
  reset(){
    this.userObj.email = ""
  }
}
