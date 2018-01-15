import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class EventProvider {

  public eventListRef: firebase.database.Reference;
  public eventRef: firebase.database.Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.eventListRef = firebase.database()
          .ref(`/userProfile/${user.uid}/eventList`);
      }
    });
  }

  createEvent( nom:string, adresse:string, date:string, horaire:string, prix:number,
            cout: number, nbPlaces: number, etat:number): firebase.database.ThenableReference {
    return this.eventListRef.push({ nomEvent: nom, adresseEvent: adresse,
      dateEvent: date, horaireEvent: horaire, prixEvent: prix, coutEvent: cout, beneficeEvent: cout * -1,
    nbPlacesEvent: nbPlaces, inscritsEvent: 0, etatEvent: etat});
  }

  updateEvent(idEvent:string, nom:string, adresse:string, date:string, horaire:string, prix:number,
            cout: number, nbPlaces: number) {

    this.eventRef = this.getEvent(idEvent);
    this.eventRef.update({nomEvent:nom, adresseEvent:adresse, dateEvent:date,
      horaireEvent:horaire, prixEvent:prix, coutEvent:cout, nbPlacesEvent: nbPlaces});
  }

  getEventList(): firebase.database.Reference {
    return this.eventListRef;
  }

  getEvent(idEvent:string): firebase.database.Reference {
    return this.eventListRef.child(idEvent);
  }

  addGuest(nom: string, prenom: string, email: string, idEvent: string, prixEvent: number)
  : PromiseLike<any> {
    return this.eventListRef.child(`${idEvent}/guestList`)
      .push({ nomGuest:nom, prenomGuest:prenom, emailGuest:email}).then
    (newGuest => {
      this.eventListRef.child(idEvent).transaction(event => {
        event.inscritsEvent += 1;
        if(event.inscritsEvent==event.nbPlacesEvent){
          event.etatEvent=0;
        }
        return event;
      });
    });
  }

  getGuest(idEvent:string, idGuest: string){
    return this.eventListRef.child(`${idEvent}/guestList/${idGuest}`);
  }

  updateGuest(idEvent:string, idGuest:string, nom:string, prenom:string, email:string){

    this.getGuest(idEvent, idGuest).update({nomGuest:nom, prenomGuest:prenom,
      emailGuest: email});

  }

  getGuestList(idEvent:string): firebase.database.Reference {
    return this.eventListRef.child(`${idEvent}/guestList`);
  }

  deleteGuest(idEvent:string, idGuest: string): void {

    this.getGuest(idEvent, idGuest).remove().then(guest => {
      this.eventListRef.child(idEvent).transaction(event => {
        event.inscritsEvent -= 1;
        if(event.etatEvent==0) {event.etatEvent=1;}
        return event;
      });
    });
  }

}
