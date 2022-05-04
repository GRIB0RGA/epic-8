import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookingTransformService } from 'src/app/services/booking-transform.service';
import { BookingService } from 'src/app/services/booking.service';
import { Booking, BookingStatus } from '../../models/booking.model';

import { capitalizeCredentials, createUpdateBody } from '../../utils/helpers.fn';
import { DATE_FORMAT } from '../../utils/variables';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { PractitionerService } from 'src/app/services/practitioner.service';
import { Router } from '@angular/router';
import { PatientRoutes, SharedRoutes } from '../../models/routes.model';
import { Roles } from '../../models/roles.model';
import { Member } from '../../models/member.model';
import { Practitioner } from '../../models/practitioner.model';
@Component({
  selector: 'app-consultations-layout',
  templateUrl: './consultations-layout.component.html',
  styleUrls: ['./consultations-layout.component.scss'],
})
export class ConsultationsLayoutComponent implements OnInit {
  //#region external Helpers
  DATE_FORMAT = DATE_FORMAT;
  faX = faX;
  bookingStatus = BookingStatus;
  sharedRoutes = SharedRoutes;
  //#endregion

  confirmedBookings$: Observable<(Practitioner | undefined)[]> | Observable<(Member | undefined)[]> | undefined;

  userPopup: Booking | undefined;

  constructor(
    private bookingTransformService: BookingTransformService,
    private bookingService: BookingService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loadConfirmedBookings();
  }

  //#region Starting Functions

  get currentRoute() {
    return this.router.url.includes(SharedRoutes.UpcomingConsultations)
      ? SharedRoutes.UpcomingConsultations
      : PatientRoutes.HealthRecords;
  }

  get header() {
    return this.currentRoute === SharedRoutes.UpcomingConsultations ? 'Upcoming consultations' : 'Health records';
  }

  get detailHeader() {
    return this.header.slice(0, -1);
  }

  loadConfirmedBookings() {
    const startTime = this.generateTimes(SharedRoutes.UpcomingConsultations);
    const endTime = this.generateTimes(PatientRoutes.HealthRecords);

    this.confirmedBookings$ =
      this.authService.role === Roles.Patient
        ? this.bookingTransformService.getConsultationLayoutBookingsOfDoctors(startTime, endTime)
        : this.bookingTransformService.getConsultationLayoutBookingsOfMembers(startTime, endTime);

    this.bookingTransformService.getConsultationLayoutBookingsOfMembers(startTime, endTime).subscribe(console.log);
  }

  generateTimes(route: SharedRoutes | PatientRoutes) {
    return this.currentRoute === route ? new Date().toISOString() : '';
  }

  //#endregion

  //#region Popup

  // showPopup(booking: Booking) {
  //   this.userPopup = booking;
  // }

  getName(booking: Practitioner | Member | undefined) {
    return booking ? capitalizeCredentials(booking.firstName, booking.lastName) : '';
  }

  getRole(doctor: Practitioner | Member | undefined) {
    if (doctor && 'practiceName' in doctor) {
      return doctor.practiceName;
    }
    return ''
  }

  closePopup() {
    this.userPopup = undefined;
  }

  cancelBooking() {
    if (this.userPopup) {
      this.bookingService
        .updateBooking(this.userPopup?.id, createUpdateBody(BookingStatus.CANCELLED))
        .subscribe(() => this.loadConfirmedBookings());
      this.userPopup = undefined;
    }
  }

  //#endregion
}
