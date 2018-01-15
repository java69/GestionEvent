import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../services/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public authProvider: AuthProvider ) {  }

  goToProfile(){
    this.navCtrl.push('ProfilePage');
  }

  goToCreateEvent(): void {
    this.navCtrl.push('EventCreatePage');
  }
  goToListEvents(): void {
    this.navCtrl.push('EventListPage');
  }

}
