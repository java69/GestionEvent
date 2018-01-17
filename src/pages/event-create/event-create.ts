import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EventProvider } from "../../services/event/event";

@IonicPage()
@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html',
})
export class EventCreatePage {

  constructor(public navCtrl: NavController, public eventProvider: EventProvider) {
  }


  createEvent(nom: string, adresse:string, date:string, horaire:string, prix: number,
              cout:number, nbPlaces:number): void {
    this.eventProvider.createEvent(nom, adresse, date, horaire, prix, cout, nbPlaces)
      .then(newEvent => {
        this.navCtrl.pop();
      });
  }

}
