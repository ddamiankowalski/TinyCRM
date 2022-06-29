import { Component, Input } from "@angular/core";

@Component({
  selector: 'login-form',
  styleUrls: ['../styles/style.scss'],
  templateUrl: '../templates/loginform.html'
})
export class LoginForm {
  showPassword = false;

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
