import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookingTransformService } from 'src/app/services/booking-transform.service';
import { BookingService } from 'src/app/services/booking.service';
import { MemberService } from 'src/app/services/member.service';
import { PractitionerService } from 'src/app/services/practitioner.service';
import { Member } from '../../models/member.model';
import { Practitioner } from '../../models/practitioner.model';
import { Roles } from '../../models/roles.model';
import { PatientRoutes, SharedRoutes } from '../../models/routes.model';
import { getUserTitle } from '../../utils/helpers.fn';

@Component({
  selector: 'app-booking-body',
  templateUrl: './booking-body.component.html',
  styleUrls: ['./booking-body.component.scss'],
})
export class BookingBodyComponent implements OnInit {
  @Input() currentPerson: Member | Practitioner | undefined;

  bookingDate = '';
  inputStatus = 'primary';

  currentEntityNo = 0;
  constructor(
    private bookingTransformService: BookingTransformService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getTitle = getUserTitle;

  get currentDate() {
    return new Date();
  }
  onDateChange(event: Date) {
    if (event) {
      this.inputStatus = 'primary';
    }
  }
  book() {
    if (!this.bookingDate) {
      this.inputStatus = 'danger';
      return;
    }

    const startTime = new Date(this.bookingDate);
    const endTime = new Date(startTime.getTime() + 30 * 60000);
    if (this.currentPerson)
      this.bookingTransformService
        .book(
          this.currentPerson.entityNo,
          this.currentPerson.firstName,
          this.currentPerson.lastName,
          startTime,
          endTime
        )
        .subscribe(() => {
          if (this.authService.role === Roles.Patient) {
            this.router.navigate([SharedRoutes.UpcomingConsultations]);
          }
        });
  }
}
