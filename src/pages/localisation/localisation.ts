import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
declare var google;

@IonicPage()
@Component({
  selector: 'page-localisation',
  templateUrl: 'localisation.html',
})
export class LocalisationPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latitude:number=0;
  longitude:number=0;
  adresse:string="";
  resultat:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {
    this.adresse=this.navParams.get("adresse");
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){

      this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+this.adresse +
      "&key=AIzaSyANy8wQ-jzDT1Y-_XvvBYcmLgv-YMdqbhs")
      .map(resp=>resp.json()).subscribe(data=>{
      this.resultat=data;
      this.latitude=this.resultat.results[0].geometry.location.lat;
      this.longitude=this.resultat.results[0].geometry.location.lng;
      let latLng = new google.maps.LatLng(this.latitude, this.longitude);

      let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: 'Localisation Event'
      });

      }, err=>{
      console.log(err);
    });

      /*autre methode avec NativeGeocoder

    /*this.nativeGeocoder.forwardGeocode(this.adresse)
   .then((coordinates: NativeGeocoderForwardResult) =>{
     this.latitude=coordinates.latitude;
     this.longitude=coordinates.longitude;
     let latLng = new google.maps.LatLng(Number(this.latitude), Number(this.longitude));

     let mapOptions = {
       center: latLng,
       zoom: 15,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     }

     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

   })
   .catch((error: any) => console.log(error));
*/

  }

}
