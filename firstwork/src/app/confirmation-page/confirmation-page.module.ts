import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ConfirmationPageRoutingModule } from './confirmation-page-routing.module';



@NgModule({
  declarations: [
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    ConfirmationPageRoutingModule
  ]
})
export class ConfirmationPageModule { }
