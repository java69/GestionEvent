import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { EventProvider } from "../../services/event/event";

@IonicPage()
@Component({
  selector: 'page-event-update',
  templateUrl: 'event-update.html',
})
export class EventUpdatePage {

  public currentEvent: any = {};
  public nomEvent:string;
  public adresseEvent:string;
  public dateEvent:string="";
  public prixEvent:number;
  public coutEvent:number;
  public horaireEvent:string;
  public nbPlacesEvent:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public eventProvider: EventProvider) {

    this.eventProvider.getEvent(this.navParams.get("idEvent"))
      .on("value", eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.currentEvent.id = eventSnapshot.key;
        this.dateEvent=this.currentEvent.dateEvent;
      });
  }

  ionViewDidLoad() {

  }

  editerEvent(){
     this.eventProvider.updateEvent(this.currentEvent.id, this.nomEvent, this.adresseEvent,
       this.dateEvent, this.horaireEvent, this.prixEvent, this.coutEvent, this.nbPlacesEvent);
    this.navCtrl.pop();
  }

}
