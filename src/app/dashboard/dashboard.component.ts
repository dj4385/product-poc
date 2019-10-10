import { Component, OnInit } from '@angular/core';
import { CommonSerService } from '../common/common-ser.service';
import { AlertSerService } from '../common/alert-ser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  productsObj : any = {}
  productArr : any = []
  token = ""
  totalProducts : number = 0
  convertedImg = ""

  constructor(
    private _comSer : CommonSerService,
    private _alert : AlertSerService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token')
    this.getAllProdcuts()
    
  }

  getAllProdcuts(){
    if(this.token != null){
      this._comSer.getProducts(this.token).subscribe(
        res=>{
          this.productsObj = res
          this.getImageFromBase64String(this.productsObj._products)
          this.productArr = this.productsObj._products
          this.totalProducts = this.productArr.length
        },
        err=>{
          this._alert.errorMsg(err.message)
        }
      )
    } else {
      this._alert.errorMsg('Invalid Token')
    }
  }

  
  getImageFromBase64String(productArr){
    var imgUrl = ""
    productArr.forEach(element => {
      this.convertedImg = ""
      imgUrl = element.productImg
      this.convertedImg = "data:image/jpeg;base64,"+imgUrl
      imgUrl = ""
    });
  }

  deleteProduct(item){
    if(confirm('Are you sure') && this.token != null){
      this._comSer.deleteProduct(item._id, this.token).subscribe(
        res=>{
          if(res){
            this._alert.successMsg('Product detail deleted successfully')
            this.getAllProdcuts()
          }
        },
        err=>{
          this._alert.errorMsg(err.message)
        }
      )
    }
  }

  updateProduct(item){
    this._router.navigate(['/addProduct'],item)
  }
  searchProduct(event){
    let searchKey = event.target.value
    if(searchKey !== ""){
      this.productArr.forEach(element => {
        if(element.productName.toLowerCase() === searchKey.toLowerCase()){
          this.productArr = []
          this.productArr.push(element)
        }
      });
    }
    else{
      this.getAllProdcuts()
    }
  }

}
