import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { CommonSerService } from './common/common-ser.service';

@Injectable()

export class AuthGuard implements CanActivate  {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(
    private _commonSer : CommonSerService,
    private _route: Router
  ){}

  canActivate(): boolean{
    if(this._commonSer.isLogin()){
      return true
    } else {
      this._route.navigate(['/Home'])
      return false
    }
    
  }
}
