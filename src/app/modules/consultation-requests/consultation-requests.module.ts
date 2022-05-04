import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultationRequestsRoutingModule } from './consultation-requests-routing.module';
import { ConsultationRequestsComponent } from './consultation-requests.component';


@NgModule({
  declarations: [
    ConsultationRequestsComponent
  ],
  imports: [
    CommonModule,
    ConsultationRequestsRoutingModule
  ]
})
export class ConsultationRequestsModule { }
