import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthRecordsRoutingModule } from './health-records-routing.module';
import { HealthRecordsComponent } from './health-records.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HealthRecordsComponent
  ],
  imports: [
    CommonModule,
    HealthRecordsRoutingModule,
    SharedModule
  ]
})
export class HealthRecordsModule { }
