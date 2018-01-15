import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, Loading, LoadingController, NavController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../services/auth/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  public loginForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
              public alertCtrl: AlertController, public authProvider: AuthProvider,
              formBuilder: FormBuilder) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

  }

  newCompte():void {
    this.navCtrl.push('SignupPage');
  }
  resetMotDePasse():void {
    this.navCtrl.push('ResetPasswordPage');
  }

  connexion(): void {

    if (!this.loginForm.valid) {
      console.log(`Formulaire non valide, valeur: ${this.loginForm.value}`);
    }
    else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authProvider.connexion(email, password).then(
        authData => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(HomePage);
          });
        },
        error => {
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            alert.present();
          });
        }
      );

      this.loading = this.loadingCtrl.create();
      this.loading.present();



    }

  }

}
