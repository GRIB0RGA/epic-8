import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthRecordsComponent } from './health-records.component';

const routes: Routes = [{ path: '', component: HealthRecordsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthRecordsRoutingModule { }
