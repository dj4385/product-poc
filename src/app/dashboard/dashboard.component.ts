import { Component, OnInit } from '@angular/core';
import { CommonSerService } from '../common/common-ser.service';
import { AlertSerService } from '../common/alert-ser.service';

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
  constructor(
    private _comSer : CommonSerService,
    private _alert : AlertSerService
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
          this.productArr = this.productsObj._products
          this.totalProducts = this.productArr.length
          console.log(this.productArr)
        },
        err=>{
          this._alert.errorMsg(err.message)
        }
      )
    } else {
      this._alert.errorMsg('Invalid Token')
    }
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
 

}
