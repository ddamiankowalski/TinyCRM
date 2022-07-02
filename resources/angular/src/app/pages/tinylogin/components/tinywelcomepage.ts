import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Backend } from "src/app/services/backend";

interface newUser {
  first_name: string,
  last_name: string,
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
  public userModel: any = {};

  showPassword = false;

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
  }

  fireButtonAction() {
    this.isLoginActive ? this.login() : this.register()
  }

  login() {
  }

  isButtonActive() {
    return this.userModel.formStatus == "INVALID" ? true : false;
  }

  register() {
    let newUser: newUser = {
      first_name: "firstName",
      last_name: "lastName",
      email: this.userModel.email,
      password: this.userModel.password,
      isValid: this.userModel.formStatus
    };

    console.log(newUser)

    this.backend.postRequest('register', JSON.stringify(newUser)).subscribe(response => {
      console.log(response);
    })
  }
}
