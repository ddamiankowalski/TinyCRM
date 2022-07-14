import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TinyLoginModule } from './pages/tinylogin/tinyloginmodule';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { TinyWelcomePage } from './pages/tinylogin/components/tinywelcomepage';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NbDialogModule, NbToastrModule } from '@nebular/theme';
import { ConfirmPage } from './pages/tinyconfirm/components/confirmpage';
import { TinyConfirmModule } from './pages/tinyconfirm/tinyconfirmmodule';

@Component({
  selector: 'tinycrm',
  template: '<router-outlet></router-outlet>'
})
export class TinyCRM {

}

@NgModule({
  declarations: [
    TinyCRM,
  ],
  imports: [
    TinyLoginModule,
    TinyConfirmModule,
    CommonModule,
    BrowserModule,
    NbEvaIconsModule,
    HttpClientModule,
    NbDialogModule.forRoot({ closeOnBackdropClick: false, closeOnEsc: false }),
    NbToastrModule.forRoot(),
    RouterModule.forRoot(
      [
        { path: "login", component: TinyWelcomePage },
        { path: '', redirectTo: '/login', pathMatch: 'full' },
        { path: 'confirm/:uuid', component: ConfirmPage }
      ]
    ),
  ],
  providers: [],
  bootstrap: [TinyCRM]
})
export class TinyCRMModule {

 }
