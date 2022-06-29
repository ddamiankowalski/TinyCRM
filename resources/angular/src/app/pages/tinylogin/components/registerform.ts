import { Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";

@Component({
  selector: 'register-form',
  styleUrls: ['../styles/style.scss'],
  templateUrl: '../templates/registerform.html'
})
export class RegisterForm {
  @Output() registerObject = new EventEmitter<any>();
  public newUser: any = {};

  public showPasswordFirst: boolean = false;
  public showPasswordSecond: boolean = false;
  public email: string = "";
  public password: string = "";
  public passwordRepeat: string = "";

  ngOnInit(): void {
    this.registerObject.emit(this.newUser);
  }

  showEmailChange(value: any) {
    this.newUser.email = value;
  }

  showPasswordChange(value: any) {
    this.newUser.password = value;
  }

  showPasswordRepeatChange(value: any) {
    this.newUser.passwordRepeat = value;
  }

  getInputTypeFirst() {
    if (this.showPasswordFirst) {
      return 'text';
    }
    return 'password';
  }

  getInputTypeSecond() {
    if (this.showPasswordSecond) {
      return 'text';
    }
    return 'password';
  }

  toggleShowFirstPassword() {
    this.showPasswordFirst = !this.showPasswordFirst;
  }

  toggleShowSecondPassword() {
    this.showPasswordSecond = !this.showPasswordSecond;
  }
}
