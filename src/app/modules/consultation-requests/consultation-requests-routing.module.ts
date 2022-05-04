import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultationRequestsComponent } from './consultation-requests.component';

const routes: Routes = [{ path: '', component: ConsultationRequestsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultationRequestsRoutingModule { }
