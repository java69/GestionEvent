import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalisationPage } from './localisation';

@NgModule({
  declarations: [
    LocalisationPage,
  ],
  imports: [
    IonicPageModule.forChild(LocalisationPage),
  ],
})
export class LocalisationPageModule {}
