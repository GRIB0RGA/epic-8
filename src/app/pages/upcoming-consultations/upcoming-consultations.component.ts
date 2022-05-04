import { Component, OnInit } from '@angular/core';
import { BookingStatus } from 'src/app/modules/shared/models/booking.model';

@Component({
  selector: 'app-upcoming-consultations',
  templateUrl: './upcoming-consultations.component.html',
  styleUrls: ['./upcoming-consultations.component.scss'],
})
export class UpcomingConsultationsComponent implements OnInit {
  bookingStatus = BookingStatus;
  constructor() {}

  ngOnInit(): void {}
}
