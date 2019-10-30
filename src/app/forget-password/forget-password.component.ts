import { Component, OnInit } from '@angular/core';
import { CommonSerService } from '../common/common-ser.service';
import { AlertSerService } from '../common/alert-ser.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private _alertSer: AlertSerService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show()
    setTimeout(()=>{
      this.spinner.hide()
    },2000)
  }
  forgetPass(){
    this.spinner.show()
    this._comSer.forgetPassword(this.userObj).subscribe(
      res=>{
        if(res){
          this.response = res
          if(this.response.status === 200){
            this._alertSer.successMsg(this.response.message)
            this.spinner.hide()
            this.reset()
          } else if(this.response.status === 404){
            this.spinner.hide()
            this._alertSer.errorMsg(this.response.message)
          } else {
            this.spinner.hide()
            this._alertSer.errorMsg(this.response.message)
          }
        }
      },
      err=>{
        this.spinner.hide()
        this._alertSer.errorMsg(err.message)
      }
    )
  }
  reset(){
    this.userObj.email = ""
  }
}
