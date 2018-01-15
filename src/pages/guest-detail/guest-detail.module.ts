import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuestDetailPage } from './guest-detail';

@NgModule({
  declarations: [
    GuestDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(GuestDetailPage),
  ],
})
export class GuestDetailPageModule {}
