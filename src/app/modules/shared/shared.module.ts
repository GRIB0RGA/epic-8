import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NebularModule } from './nebular/nebular.module';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoBackComponent } from './buttons/go-back/go-back.component';
import { ConsultationRequestCardComponent } from './components/consultation-request-card/consultation-request-card.component';
import { OppositeRoleCredentialsPipe } from './pipes/opposite-role-credentials.pipe';
import { ConsultationsLayoutComponent } from './components/consultations-layout/consultations-layout.component';
import { SearchShellComponent } from './components/search-shell/search-shell.component';

import { BookingBodyComponent } from './components/booking-body/booking-body.component';

import { GetOcupationPipe } from './components/consultations-layout/pipes/get-ocupation.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    SideBarComponent,
    GoBackComponent,
    ConsultationRequestCardComponent,
    OppositeRoleCredentialsPipe,
    SearchShellComponent,
    ConsultationsLayoutComponent,
    BookingBodyComponent,

    GetOcupationPipe,
  ],
  imports: [CommonModule, NebularModule, FontAwesomeModule, RouterModule, ReactiveFormsModule, FormsModule],
  exports: [
    HeaderComponent,
    SideBarComponent,
    GoBackComponent,
    NebularModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ConsultationRequestCardComponent,
    OppositeRoleCredentialsPipe,
    ConsultationsLayoutComponent,
    SearchShellComponent,

    FormsModule,

    BookingBodyComponent,
  ],
})
export class SharedModule {}
