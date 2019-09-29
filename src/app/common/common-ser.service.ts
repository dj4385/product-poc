import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CommonSerService {

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
  addProduct(){

  }
  updateProduct(){

  }
  deleteProduct(id,token){
    let _header = new HttpHeaders({"token":token})
    return this._httpClient.delete(environment.apiUrl.deleteProductUrl+id, { headers: _header})
  }
}
