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
  public disponibilite:boolean;

  constructor(public navCtrl: NavController,public alertCtrl:AlertController,
              public eventProvider: EventProvider) {
  }

  ionViewDidLoad() {
    this.eventProvider.getEventList().on("value", eventListSnapshot => {
      this.eventList = [];      
      eventListSnapshot.forEach(snap => {
        if(snap.val().inscritsEvent==snap.val().nbPlacesEvent){
          this.disponibilite=false;
        }
        else{
          this.disponibilite=true;
        }
        this.eventList.push({
          id: snap.key,
          nom: snap.val().nomEvent,
          lieu: snap.val().adresseEvent,
          date: snap.val().dateEvent,
          horaire: snap.val().horaireEvent,
          inscrits: snap.val().inscritsEvent,
          disponibilite:this.disponibilite
        });
        return false;
      });
    });
  }

  goToEventDetail(id):void {
    this.navCtrl.push('EventDetailPage', { idEvent: id })
  }

 
}
