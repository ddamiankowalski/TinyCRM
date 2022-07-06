import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'login-form',
  styleUrls: ['../styles/style.scss'],
  templateUrl: '../templates/loginform.html'
})
export class LoginForm {
  @Output() loginObject = new EventEmitter<any>();
  public newUser: any = {
    email: null,
    password: null,
    formStatus: 'INVALID'
  };

  ngOnInit(): void {
    this.loginObject.emit(this.newUser);
  }

  public showPassword: boolean = false;
  public email: string = "";
  public password: string = "";

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  generateError(model: any) {
    if(model.control.errors['email']) {
      return "Adres email nieprawidlowy"
    } else if (model.control.errors['required']) {
      return "Pole jest wymagane"
    }
    return "Pole jest wymagane"
  }

  getEmailChange(model: any) {
    this.newUser.email = model.control.value.email;
    this.newUser.formStatus = model.control.status;
  }

  getPasswordChange(model: any) {
    this.newUser.password = model.control.value.password;
    this.newUser.formStatus = model.control.status;
  }
}
