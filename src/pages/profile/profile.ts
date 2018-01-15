import { Component } from "@angular/core";
import { Alert, AlertController, IonicPage, NavController} from "ionic-angular";
import { ProfileProvider } from "../../services/profile/profile";
import { AuthProvider } from "../../services/auth/auth";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  public userProfile: any;
  public dateNaissance: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
              public authProvider: AuthProvider, public profileProvider: ProfileProvider) { }

  ionViewDidLoad() {
    this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      this.dateNaissance = userProfileSnapshot.val().dateNaissance;
    });
  }

  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('LoginPage');
    });
  }

  updateName(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Entrez vos prénom et nom",
      inputs: [
        {
          name: "prenom",
          placeholder: "Votre Prénom",
          value: this.userProfile.prenom
        },
        {
          name: "nom",
          placeholder: "Votre Nom",
          value: this.userProfile.nom
        }
      ],
      buttons: [
        { text: "Annuler" },
        {
          text: "Valider",
          handler: data => {
            this.profileProvider.updateName(data.prenom, data.nom);
          }
        }
      ]
    });
    alert.present();
  }

  updateDateNaiss(dateNaissance:string):void {
    this.profileProvider.updateDOB(dateNaissance);
  }

  updateEmail(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [{ name: 'password', placeholder: 'Votre mot de passe', type: 'password' },
               { name: 'newEmail', placeholder: 'Votre nouvel email' }
        ],
      buttons: [
        { text: 'Annuler' },
        { text: 'Valider',
          handler: data => {
            this.profileProvider.updateEmail(data.newEmail, data.password)
              .then(() => { console.log('Email Changed Successfully'); })
              .catch(error => { console.log('ERROR: ' + error.message); });
          }}]
    });
    alert.present();
  }

  updateMotPasse(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        { name: 'oldPassword', placeholder: 'Ancien mot de passe', type: 'password' },
        { name: 'newPassword', placeholder: 'Nouveau mot de passe', type: 'password' }
      ],
      buttons: [
        { text: 'Annuler' },
        { text: 'Valider',
          handler: data => {
            this.profileProvider.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          }
        }
      ]
    });
    alert.present();
  }


}
