import { Component, ComponentFactoryResolver } from "@angular/core";
import { Backend } from "src/app/services/backend";
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from "@nebular/theme";
import { CookieService } from 'ngx-cookie-service';

interface newUser {
  email: string,
  password: string,
  isValid?: string
}

@Component({
  styleUrls: ['../styles/style.scss'],
  templateUrl: '../templates/tinywelcomepage.html',
  selector: 'tiny-welcome-page'
})
export class TinyWelcomePage  {
  constructor(public backend: Backend, private toastrService: NbToastrService, private CookieService: CookieService) {}

  public title: string = "Tiny";
  public subtitle: string = "CRM";
  public loggedIn: boolean = true;
  public isLoginActive: boolean = true;
  public showPassword: boolean = false;
  public isLoading: boolean = false;
  public userModel: any = {
    formStatus: "INVALID"
  };

  public physicalPositions = NbGlobalPhysicalPosition;

  getNewUser(model: any) {
    this.userModel = model;
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  setLoginActive() {
    this.isLoginActive = !this.isLoginActive;
    this.userModel.formStatus = "INVALID"
  }

  fireButtonAction() {
    this.isLoginActive ? this.login() : this.register()
  }

  isButtonActive() {
    return this.userModel.formStatus == "INVALID" || this.isLoading ? true : false;
  }

  register() {
    let newUser: newUser = {
      email: this.userModel.email,
      password: this.userModel.password,
    };

    this.isLoading = true;

    this.backend.postRequest('register', JSON.stringify(newUser)).subscribe(
      {
        next: (result) => {
          // here we have to handle what happens after the user registers
          console.log(result)

          this.isLoading = false;
        },
        error: (result) => {
          console.log(result)
          this.showToast(this.physicalPositions.BOTTOM_LEFT, 'danger', result.length > 5 ? `${result.substring(0, 50)}...` : result, `Blad podczas tworzenia uzytkownika`);
          this.isLoading = false;
        }
      }
    )
  }

  showToast(position: NbGlobalPosition, status: string, message: string, mainMessage: string) {
    this.toastrService.show(message , mainMessage, { position, status, preventDuplicates: true });
  }

  login() {
    let newUser: newUser = {
      email: this.userModel.email,
      password: this.userModel.password,
    };

    this.isLoading = true;

    this.backend.postRequest('login', JSON.stringify(newUser)).subscribe(
      {
        next: (result) => {
          this.CookieService.set('tinycrm_token', result.message);
          this.isLoading = false;

          // navigate to a different screen
        },
        error: (result) => {
          this.showToast(this.physicalPositions.BOTTOM_LEFT, 'danger', result, `Blad podczas tworzenia uzytkownika`);
          this.isLoading = false;
        }
      }
    )
  }

  forgotPassword() {
    console.log('hello')
  }
}
