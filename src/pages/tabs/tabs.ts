import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {OutilsPage} from "../outils/outils";
import {AidePage} from "../aide/aide";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = OutilsPage;
  tab3Root = AidePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
