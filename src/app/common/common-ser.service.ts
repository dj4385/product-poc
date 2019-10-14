import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CommonSerService{
  apiUrl = {
    "registerUrl": "/v1/api/register",
    "loginUrl": "/v1/api/login",
    "getProductUrl" : "/v1/api/product/products",
    "addProductUrl" : "/v1/api/product/addProduct",
    "deleteProductUrl": "/v1/api/product/products/",
    "updateProductUrl": "/v1/api/product/products/",
    "getSingleProductUrl": "/v1/api/product/product/",
    "forgetPasswordUrl": "/v1/api/forgetPassword"
  }

  constructor(
    private _httpClient: HttpClient
  ) { }

  registerUser(registerUserObj){
    return this._httpClient.post(this.apiUrl.registerUrl, registerUserObj)
  }
  loginUser(loginUserObj){
    return this._httpClient.post(this.apiUrl.loginUrl, loginUserObj)
  }
  getProducts(token){
    let _header = new HttpHeaders({"token":token})
    return this._httpClient.get(this.apiUrl.getProductUrl, { headers: _header})
  }
  getSingleProduct(id, token){
    let _header = new HttpHeaders({"token":token})
    return this._httpClient.get(this.apiUrl.getSingleProductUrl+id, { headers: _header})
  }
  addProduct(productObj, token){
    let _header = new HttpHeaders({"token": token})
    return this._httpClient.post(this.apiUrl.addProductUrl, productObj, {headers: _header})
  }
  updateProduct(id, productObj, token){
    let _header = new HttpHeaders({"token": token})
    return this._httpClient.put(this.apiUrl.updateProductUrl+id, productObj, {headers: _header})
  }
  deleteProduct(id,token){
    let _header = new HttpHeaders({"token":token})
    return this._httpClient.delete(this.apiUrl.deleteProductUrl+id, { headers: _header})
  }
  forgetPassword(emailObj){
    return this._httpClient.post(this.apiUrl.forgetPasswordUrl, emailObj)
  }

  isLogin(){
    return !!localStorage.getItem('token')
  }
}
