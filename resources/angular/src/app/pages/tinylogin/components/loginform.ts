import { Component, Input } from "@angular/core";

@Component({
  selector: 'login-form',
  styleUrls: ['../styles/style.scss'],
  templateUrl: '../templates/loginform.html'
})
export class LoginForm {
  showPassword = false;
  public email: string = "";

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
}
