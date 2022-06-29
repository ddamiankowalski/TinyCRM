import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TinyLoginModule } from './pages/tinylogin/tinyloginmodule';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { TinyWelcomePage } from './pages/tinylogin/components/tinywelcomepage';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'tinycrm',
  template: '<router-outlet></router-outlet>'
})
export class TinyCRM {

}

@NgModule({
  declarations: [
    TinyCRM
  ],
  imports: [
    TinyLoginModule,
    CommonModule,
    BrowserModule,
    NbEvaIconsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        { path: "login", component: TinyWelcomePage },
        { path: '', redirectTo: '/login', pathMatch: 'full' },
      ]
    ),
  ],
  providers: [],
  bootstrap: [TinyCRM]
})
export class TinyCRMModule {

 }
