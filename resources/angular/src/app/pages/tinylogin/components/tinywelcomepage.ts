import { Component, ComponentFactoryResolver, ElementRef, TemplateRef, ViewChild } from "@angular/core";
import { Backend } from "src/app/services/backend";
import { NbDialogService, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from "@nebular/theme";
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from "@angular/router";

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
  constructor(public backend: Backend, private toastrService: NbToastrService, private CookieService: CookieService, private dialogService: NbDialogService, private route: ActivatedRoute, private router: Router) {}

  public title: string = "Tiny";
  public subtitle: string = "CRM";
  public loggedIn: boolean = true;
  public isLoginActive: boolean = true;
  public showPassword: boolean = false;
  public isLoading: boolean = false;
  public isResendLoading: boolean = false;
  public userModel: any = {
    formStatus: "INVALID"
  };

  @ViewChild('dialog', { static: true, read: TemplateRef }) dialog!: any;

  public physicalPositions = NbGlobalPhysicalPosition;

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['uuid']) this.activateAcc(params['uuid'])
    })
  }

  activateAcc(uuid: any) {
    console.log(uuid)
    this.backend.postRequest('activate', JSON.stringify({ uuid: uuid })).subscribe(
      {
        next: (value) => {
          this.showToast(this.physicalPositions.BOTTOM_LEFT, 'success', value, 'Mozesz sie teraz zalogowac na swoje konto')
        },
        error: (result) => {
          console.log(result)
          this.showToast(this.physicalPositions.BOTTOM_LEFT, 'danger', result, `Blad podczas aktywacji konta`);
        }
      }
    )
  }

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
          this.open(this.dialog);
          console.log(result)
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
          this.showToast(this.physicalPositions.BOTTOM_LEFT, 'danger', result, `Blad podczas logowania`);
          this.isLoading = false;
        }
      }
    )
  }

  forgotPassword() {
    console.log('hello')
  }

  sendEmail() {
    this.isResendLoading = true;
    this.backend.postRequest('resendmail', JSON.stringify({ email: this.userModel.email })).subscribe(
      {
        next: (value) => {
          this.showToast(this.physicalPositions.BOTTOM_LEFT, 'success', 'Sprawdz swoja poczte', 'Poprawnie wyslano wiadomosc')
          this.isResendLoading = false;
        },
        error: (result) => {
          this.showToast(this.physicalPositions.BOTTOM_LEFT, 'danger', result, 'Blad podczas wysylania wiadomosci')
        }
      }
    )
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'Na podany adres email zostala wyslana wiadomosc z linkiem aktywujacym konto w systemie' });
  }

  close(ref: any, fn: any) {
    ref.onClose = fn;
    ref.close();
    this.isLoading = false;
  }
}
