import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from "ionic-angular";
import { EventProvider } from "../../services/event/event";

@IonicPage({
  segment: "event-detail/:idEvent"
})
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})

export class EventDetailPage {

  public nomGuest: string = '';
  public prenomGuest: string = '';
  public emailGuest: string = '';
  public currentEvent: any = {};
  public beneficeEvent: number;
  public disponibilite:boolean;

  constructor(public navCtrl: NavController, public alertCtrl:AlertController,
              public navParams: NavParams, public eventProvider: EventProvider,
              ) {
  }

  ionViewDidLoad() {

    this.eventProvider.getEvent(this.navParams.get("idEvent"))
      .on("value", eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.currentEvent.id = eventSnapshot.key;
        this.beneficeEvent = (this.currentEvent.inscritsEvent*
          this.currentEvent.prixEvent) - (this.currentEvent.coutEvent);
        
        if(this.currentEvent.inscritsEvent==this.currentEvent.nbPlacesEvent) {
          this.disponibilite=false;
        }
        else {
          this.disponibilite=true;
        }     
     
      });
      
  }

  goToGuestsPage(id:string):void{
    this.navCtrl.push('GuestListPage', { idEvent: id });
  }

  goToUpdateEventPage(id:string):void{
    this.navCtrl.push('EventUpdatePage', { idEvent: id });
  }

  goToLocalisationPage(adresse:string){

    this.navCtrl.push('LocalisationPage', { adresse: adresse });

  }


}
