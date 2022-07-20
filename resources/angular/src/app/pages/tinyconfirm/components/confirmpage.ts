import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  templateUrl: '../templates/confirmpage.html',
  selector: 'confirm-page',
  styleUrls: ['../styles/style.scss'],
})
export class ConfirmPage {
  public loggedIn: boolean = true;
  public linearMode: boolean = true;
  public stepNum: number = 0;

  public toggleLinearMode() {
    this.linearMode = !this.linearMode
  }

  public previousStep() {
    this.stepNum = this.stepNum--;
  }

  public nextStep() {
    this.stepNum = this.stepNum++;
  }
}
