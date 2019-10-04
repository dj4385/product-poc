import { Component, OnInit } from '@angular/core';
import { CommonSerService } from '../common/common-ser.service';
import { AlertSerService } from '../common/alert-ser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.css']
})
export class AddUpdateProductComponent implements OnInit {

  productDetailObj : any = {}
  response : any = {}
  responseArr : any = []
  token = ""
  id = ""
  isProductDetailObj = false
  productCategory = ['Electronics','Fashion','Toys','Software']
  _totalPrice = this.productDetailObj.productQty * this.productDetailObj.price 

  constructor(
    private _comSer: CommonSerService,
    private _alert: AlertSerService,
    private _activeRoute: ActivatedRoute,
    private _router : Router
  ) { }

  ngOnInit() {
    this.id = this._activeRoute.snapshot.queryParams['id']
    this.token = localStorage.getItem("token")
    console.log("id",this.id)
    if(this.id === undefined){
      this.isProductDetailObj = true
    } else {
      this._comSer.getSingleProduct(this.id,this.token).subscribe(
        res=>{
          console.log(res)
          this.response = res
          if(this.response.product._id === this.id){
              this.productDetailObj.productName = this.response.product.productName
              this.productDetailObj.category = this.response.product.category
              this.productDetailObj.productQty = this.response.product.productQty
              this.productDetailObj.price = this.response.product.price
            }
        },
        err=>{
          console.log(err)
        }
      )
    }
  }

  addProduct(){
    if(this.token !=null){
      this.productDetailObj.totalPrice = this._totalPrice
      
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
    } else {
      this._alert.errorMsg("Invalid token")
    }
  }
  updateProduct(){
    if(this.token){
      this._comSer.updateProduct(this.id, this.productDetailObj, this.token).subscribe(
        res=>{
          this.response = res
          this._alert.successMsg(this.response.message)
          this.reset()
          this._router.navigate(['/dashboard'])
        },
        err=>{
          this._alert.errorMsg(err.message)
        }
      )
    } else {
      this._alert.errorMsg("Invalid token")
    }
  }
  reset(){
    this.productDetailObj = {}
  }
}
