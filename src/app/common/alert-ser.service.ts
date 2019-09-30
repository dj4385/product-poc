import { Injectable } from '@angular/core';
import  Swal  from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertSerService {

  constructor() { }

  successMsg(msg){
    Swal.fire({
      title:"Success",
      text:msg,
      type: "success",
      allowOutsideClick: false
    })
  }

  errorMsg(errMsg){
    Swal.fire({
      title:"Error",
      text:errMsg,
      type: "error",
      allowOutsideClick: false
    })
  }
}
