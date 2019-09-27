import { Component, OnInit } from '@angular/core';
import { CommonSerService } from '../common/common-ser.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regUserObj = {
    fullName : "",
    email : "",
    password : ""
  }

  constructor(
    private _commonSer : CommonSerService
  ) { }

  ngOnInit() {
  }

  register(){
    console.log(this.regUserObj)
    this._commonSer.registerUser(this.regUserObj).subscribe(
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
    this.regUserObj = {
      fullName : "",
      email : "",
      password : ""
    }
  }
}
