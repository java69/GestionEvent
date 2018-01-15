import { Component } from '@angular/core';
import {Alert, AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {EventProvider} from "../../services/event/event";

@IonicPage()
@Component({
  selector: 'page-guests',
  templateUrl: 'guest-list.html',
})
export class GuestListPage {

  public guestList: Array<any>;
  public currentEvent: any = {};
  public nomGuest = "";
  public prenomGuest = "";
  public emailGuest = "";
  public activeAddGuest: boolean = false;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
              public navParams: NavParams, public eventProvider: EventProvider) {
  }

  ionViewDidLoad() {

    this.eventProvider.getGuestList(this.navParams.get("idEvent")).on("value", guestListSnapshot => {
      this.guestList = [];
      guestListSnapshot.forEach(snap => {
        this.guestList.push({
          id: snap.key,
          nom: snap.val().nomGuest,
          prenom: snap.val().prenomGuest,
          email: snap.val().emailGuest
        });
        return false;
      });
    });

    this.eventProvider.getEvent(this.navParams.get("idEvent"))
      .on("value", eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.currentEvent.id = eventSnapshot.key;
      });
  }

  deleteGuest(idGuest: string): void {

    this.activeAddGuest = false;
    const alert: Alert = this.alertCtrl.create({
      message: "Supprimer ce participant?",

      buttons: [
        {text: "NON"},
        {
          text: "OUI",
          handler: data => {
            this.eventProvider.deleteGuest(this.currentEvent.id, idGuest);
          }
        }
      ]
    });
    alert.present();
  }

  editGuest(id: string) {
    this.activeAddGuest = false;

    this.eventProvider.getGuest(this.currentEvent.id, id)
      .on("value", guestSnapshot => {
        this.nomGuest = guestSnapshot.val().nomGuest;
        this.prenomGuest = guestSnapshot.val().prenomGuest;
        this.emailGuest = guestSnapshot.val().emailGuest;

      });

    const alert: Alert = this.alertCtrl.create({
      message: "Mise à jour participant",
      inputs: [
        {
          name: "nom",
          placeholder: "Nom du participant",
          value: this.nomGuest
        },

        {
          name: "prenom",
          placeholder: "Prénom du participant",
          value: this.prenomGuest
        },

        {
          name: "email",
          placeholder: "Email du participant",
          value: this.emailGuest
        }

      ],
      buttons: [
        {text: "Annuler"},
        {
          text: "Valider",
          handler: data => {
            this.eventProvider.updateGuest(this.currentEvent.id, id, data.nom, data.prenom, data.email);
          }
        }
      ]
    });
    alert.present();
  }

  addGuest(nom: string, prenom: string, email: string): void {

    this.eventProvider.addGuest(nom, prenom, email, this.currentEvent.id, this.currentEvent.prixEvent)
      .then(newGuest => {
        this.activeAddGuest = false;

        if (this.currentEvent.inscritsEvent == this.currentEvent.nbPlacesEvent) {
          const alert: Alert = this.alertCtrl.create({
            message: "Limite des places atteinte avec cette inscription",
            buttons: [
              {text: "OK"},
            ]
          });
          alert.present();

        }
      });
  }

  setAddGuest(){
    if (this.currentEvent.inscritsEvent == this.currentEvent.nbPlacesEvent) {
      const alert: Alert = this.alertCtrl.create({
        message: "Cet Event est complet !",
        buttons: [
          {text: "OK"},
        ]
      });
      alert.present();
    }
    else
    this.activeAddGuest=true;
    this.nomGuest = "";
    this.prenomGuest = "";
    this.emailGuest = ""

  }


}
