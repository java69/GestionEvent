import { Component } from "@angular/core";
import {IonicPage, NavController, AlertController} from "ionic-angular";
import { EventProvider } from "../../services/event/event";

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  public eventList: Array<any>;

  constructor(public navCtrl: NavController,public alertCtrl:AlertController,
              public eventProvider: EventProvider) {
  }

  ionViewDidLoad() {
    this.eventProvider.getEventList().on("value", eventListSnapshot => {
      this.eventList = [];
      eventListSnapshot.forEach(snap => {
        this.eventList.push({
          id: snap.key,
          nom: snap.val().nomEvent,
          lieu: snap.val().adresseEvent,
          date: snap.val().dateEvent,
          horaire: snap.val().horaireEvent,
          inscrits: snap.val().inscritsEvent,
          etat:snap.val().etatEvent

        });
        return false;
      });
    });
  }

  goToEventDetail(id):void {
    this.navCtrl.push('EventDetailPage', { idEvent: id })
  }

  goToLocalisationPage(adresse:string){

    this.navCtrl.push('LocalisationPage', { adresse: adresse });

  }

}
