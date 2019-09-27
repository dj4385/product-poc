import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  getProducts(){
    return this._httpClient.get(environment.apiUrl.getProductUrl)
  }
}
