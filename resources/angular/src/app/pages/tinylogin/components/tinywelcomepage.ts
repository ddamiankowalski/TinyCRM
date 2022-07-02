import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Backend } from "src/app/services/backend";

interface newUser {
  email: string,
  password: string,
  isValid: string
}

@Component({
  styleUrls: ['../styles/style.scss'],
  templateUrl: '../templates/tinywelcomepage.html',
  selector: 'tiny-welcome-page'
})
export class TinyWelcomePage  {
  constructor(public backend: Backend) {}

  public title: string = "Tiny";
  public subtitle: string = "CRM";
  public loggedIn: boolean = true;
  public isLoginActive: boolean = true;
  public showPassword: boolean = false;
  public isLoading: boolean = false;
  public userModel: any = {
    formStatus: "INVALID"
  };

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
      isValid: this.userModel.formStatus
    };

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000)

    this.backend.postRequest('register', JSON.stringify(newUser)).subscribe(response => {
      console.log(response);
    })
  }

  login() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000)
  }

  forgotPassword() {
    console.log('hello')
  }
}
