import { Component, OnInit } from '@angular/core';
import { CommonSerService } from '../common/common-ser.service';
import { AlertSerService } from '../common/alert-ser.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.css']
})
export class AddUpdateProductComponent implements OnInit {

  productDetailObj : any = {}
  response : any = {}
  token = ""
  isProductDetailObj = false


  constructor(
    private _comSer: CommonSerService,
    private _alert: AlertSerService
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem("token")
    if(Object.entries(this.productDetailObj).length === 0){
      this.isProductDetailObj = true
    }
  }

  addProduct(){
    this._comSer.addProduct(this.productDetailObj,this.token).subscribe(
      res=>{
        this.response = res
        this._alert.successMsg(this.response.message)
        this.reset()
      },
      err=>{
        this._alert.errorMsg(err.message)
      }
    )
  }
  updateProduct(){

  }
  reset(){
    this.productDetailObj = {}
  }

}
