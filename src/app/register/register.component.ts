import { Component, OnInit } from '@angular/core';
import { CommonSerService } from '../common/common-ser.service';
import { AlertSerService } from '../common/alert-ser.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import State  from '../../assets/json/state.json';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regUserObj = {
    name : "",
    contactNumber: "",
    address:"",
    state: "",
    city:"",
    country: "India",
    pincode: "",
    email : "",
    password : ""
  }

  statesJson : any = []
  statesArr: any = []
  cityArr: any = []

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
    this.getStateInfo()
  }

  getStateInfo(){
    this.statesJson = State.states
    this.statesJson.forEach(element => {
      this.statesArr.push(element.state)
    });
  }

  getCity(event){
    this.statesJson.forEach(element => {
      if(event.target.value === element.state){
       this.cityArr =  element.districts
      }
    });
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
      contactNumber: "",
      address:"",
      state: "",
      city:"",
      country: "India",
      pincode: "",
      email : "",
      password : ""
    }
  }
}
