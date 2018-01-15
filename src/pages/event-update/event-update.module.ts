import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventUpdatePage } from './event-update';

@NgModule({
  declarations: [
    EventUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(EventUpdatePage),
  ],
})
export class EventUpdatePageModule {}
