import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ErrpageComponent } from './errpage/errpage.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonSerService } from './common/common-ser.service';
import { AlertSerService } from './common/alert-ser.service';
import { AddUpdateProductComponent } from './add-update-product/add-update-product.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthGuard } from './auth.guard';
import { NgxSpinnerModule } from "ngx-spinner";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HeaderComponent,
    ErrpageComponent,
    AddUpdateProductComponent,
    ForgetPasswordComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [
    CommonSerService,
    AlertSerService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
