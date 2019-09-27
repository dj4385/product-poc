import { Component, OnInit } from '@angular/core';
import { CommonSerService } from '../common/common-ser.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  token = ""
  constructor(
    private _comSer : CommonSerService
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token')
    this.getAllProdcuts()
    
  }

  getAllProdcuts(){
    let header = new Headers()
    header.append('token',this.token)
    this._comSer.getProducts().subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.log(err)
      }
    )
  }
 

}
