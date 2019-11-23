import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CommonSerService{
  
  constructor(
    private _httpClient: HttpClient
  ) { }

  registerUser(registerUserObj){
    return this._httpClient.post(environment.apiUrl.registerUrl, registerUserObj)
  }
  loginUser(loginUserObj){
    return this._httpClient.post(environment.apiUrl.loginUrl, loginUserObj)
  }
  getProducts(token){
    let _header = new HttpHeaders({"token":token})
    return this._httpClient.get(environment.apiUrl.getProductUrl, { headers: _header})
  }
  getSingleProduct(id, token){
    let _header = new HttpHeaders({"token":token})
    return this._httpClient.get(environment.apiUrl.getSingleProductUrl+id, { headers: _header})
  }
  addProduct(productObj, token){
    let _header = new HttpHeaders({"token": token})
    return this._httpClient.post(environment.apiUrl.addProductUrl, productObj, {headers: _header})
  }
  updateProduct(id, productObj, token){
    let _header = new HttpHeaders({"token": token})
    return this._httpClient.put(environment.apiUrl.updateProductUrl+id, productObj, {headers: _header})
  }
  deleteProduct(id,token){
    let _header = new HttpHeaders({"token":token})
    return this._httpClient.delete(environment.apiUrl.deleteProductUrl+id, { headers: _header})
  }
  forgetPassword(emailObj){
    return this._httpClient.post(environment.apiUrl.forgetPasswordUrl, emailObj)
  }

  isLogin(){
    return !!localStorage.getItem('token')
  }
}
