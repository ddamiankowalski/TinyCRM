import { Component, EventEmitter, Input, Output, QueryList, SimpleChanges, TemplateRef, ViewChildren } from "@angular/core";
import { NbDialogService } from "@nebular/theme";

@Component({
  selector: 'register-form',
  styleUrls: ['../styles/style.scss'],
  templateUrl: '../templates/registerform.html'
})
export class RegisterForm {
  @ViewChildren('pwshow') pwshow!: QueryList<any>;

  @Output() registerObject = new EventEmitter<any>();
  public newUser: any = {
    email: null,
    password: null,
    formStatus: 'INVALID'
  };

  @Input() isLoading: boolean = false;

  public showPasswordFirst: boolean = false;
  public showPasswordSecond: boolean = false;
  public email: string = "";
  public password: string = "";
  public passwordRepeat: string = "";

  ngOnInit(): void {
    this.registerObject.emit(this.newUser);
  }

  ngAfterViewInit() {
    this.pwshow.forEach(element => {
      element.hostElement.nativeElement.setAttribute('tabindex', '-1');
    })
  }

  showEmailChange(model: any) {
    this.newUser.email = model.form.value.email;
    this.newUser.formStatus = model.control.status;
  }

  showPasswordChange(model: any) {
    this.newUser.password = model.control.value.password;
    this.newUser.formStatus = model.control.status;
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

  generateError(model: any) {
    if(model.control.errors['email']) {
      return "Niepoprawny adres email"
    } else if(model.control.errors['required']) {
      return "Pole nie moze byc puste"
    } else if(model.control.errors['matching']) {
      return "Hasla nie sa takie same"
    }
    return "Pole nie moze byc puste"
  }
}
