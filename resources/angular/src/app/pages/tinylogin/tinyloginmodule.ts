import { NgModule } from "@angular/core";
import { TinyWelcomePage } from "./components/tinywelcomepage";
import { NbInputModule, NbTooltipModule, NbActionsModule, NbCardModule, NbSidebarModule, NbLayoutModule, NbButtonModule, NbThemeService, NbThemeModule, NbSidebarService, NbIconModule, NbFormFieldModule } from '@nebular/theme';
import { LoginForm } from "./components/loginform";
import { CommonModule } from "@angular/common";
import { RegisterForm } from "./components/registerform";
import { FormsModule } from '@angular/forms';
import { MatchPasswordDirective } from "src/app/directives/matchpassworddirective";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    NbButtonModule,
    NbLayoutModule,
    NbSidebarModule,
    NbIconModule,
    NbCardModule,
    NbTooltipModule,
    NbInputModule,
    NbFormFieldModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbActionsModule,
    NbButtonModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    LoginForm,
    TinyWelcomePage,
    RegisterForm,
    MatchPasswordDirective
  ],
  providers: [
    NbThemeService,
    NbSidebarService
  ],
  exports: [
    TinyWelcomePage,
  ]
})
export class TinyLoginModule {}
