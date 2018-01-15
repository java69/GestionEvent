import { Component } from '@angular/core';
import {Alert, AlertController, IonicPage, Loading, LoadingController, NavController} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthProvider } from "../../services/auth/auth";
import { EmailValidator } from "../../validators/email";

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  public loading: Loading;
  public resetPasswordForm: FormGroup;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public authProvider: AuthProvider,
              public alertCtrl: AlertController, formBuilder: FormBuilder) {

    this.resetPasswordForm = formBuilder.group({
      email: ["", Validators.compose([Validators.required, EmailValidator.isValid])
      ]
    });

  }

  resetMotDePasse(): void {

    if (!this.resetPasswordForm.valid) {
      console.log(
        `Formulaire non valide, valeur: ${this.resetPasswordForm.value}`
      );
    } else {
      const email: string = this.resetPasswordForm.value.email;

      this.authProvider.resetPassword(email).then(
        user => {
          this.loading.dismiss().then(() => {
          const alert: Alert = this.alertCtrl.create({
            message: "Un lien pour redéfinir votre mot de passe vous a été envoyé.",
            buttons: [
              {
                text: "Ok",
                role: "cancel",
                handler: () => {
                  this.navCtrl.pop();
                }
              }
            ]
          });
          alert.present();})
        },
        error => {
          this.loading.dismiss().then(() => {
          const errorAlert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: "Ok", role: "cancel" }]
          });
          errorAlert.present();})
        }
      );

      this.loading = this.loadingCtrl.create();
      this.loading.present();

    }
  }

}
