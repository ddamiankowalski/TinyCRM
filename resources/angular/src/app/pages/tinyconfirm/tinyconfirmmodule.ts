import { NgModule } from "@angular/core";
import { NbActionsModule, NbButtonModule, NbCardModule, NbLayoutModule, NbStepperModule } from "@nebular/theme";
import { ConfirmPage } from "./components/confirmpage";

@NgModule({
  imports: [
    NbLayoutModule,
    NbCardModule,
    NbActionsModule,
    NbStepperModule,
    NbButtonModule
  ],
  declarations: [
    ConfirmPage,
  ],
  exports: [
    ConfirmPage
  ],
  providers: []
})
export class TinyConfirmModule {}
