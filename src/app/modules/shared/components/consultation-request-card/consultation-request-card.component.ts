import { Component, OnInit } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { BookingTransformService } from 'src/app/services/booking-transform.service';
import { BookingService } from 'src/app/services/booking.service';
import { AttendeeType, Booking, BookingStatus, BookingStatusUpdateRequest } from '../../models/booking.model';
import { capitalizeCredentials, createUpdateBody } from '../../utils/helpers.fn';
import { DATE_FORMAT } from '../../utils/variables';
@Component({
  selector: 'app-consultation-request-card',
  templateUrl: './consultation-request-card.component.html',
  styleUrls: ['./consultation-request-card.component.scss'],
})
export class ConsultationRequestCardComponent implements OnInit {
  consultationRequests$: Observable<Booking[]> | undefined;

  bookingStatus = BookingStatus;
  DATE_FORMAT = DATE_FORMAT;
  constructor(private bookingTransformService: BookingTransformService, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadTentativeBookings();
  }

  loadTentativeBookings() {
    this.consultationRequests$ = this.bookingTransformService.getTentativeBookings();
  }

  updateBooking(id: number, updateType: BookingStatus) {
    this.bookingService.updateBooking(id, createUpdateBody(updateType)).subscribe(() => this.loadTentativeBookings());
  }
}
