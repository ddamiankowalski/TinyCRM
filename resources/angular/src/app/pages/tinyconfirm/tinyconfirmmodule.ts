import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NbActionsModule, NbButtonModule, NbCardModule, NbInputModule, NbLayoutModule, NbStepperModule } from "@nebular/theme";
import { ConfirmPage } from "./components/confirmpage";

@NgModule({
  imports: [
    NbLayoutModule,
    NbCardModule,
    NbActionsModule,
    NbStepperModule,
    NbButtonModule,
    FormsModule,
    NbInputModule
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
