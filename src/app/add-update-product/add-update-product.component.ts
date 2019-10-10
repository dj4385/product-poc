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
  base64textString=""
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

  uploadImg(event){
    var files = event.target.files
    var file = files[0]
    console.log(file)
    if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    } 
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
           this.base64textString= btoa(binaryString);
           console.log("base64 str",this.base64textString);
   }

  addProduct(){
    if(this.token !=null){
      this.productDetailObj.totalPrice = this._totalPrice
      this.productDetailObj.productImg = this.base64textString
      
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
