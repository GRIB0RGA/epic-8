import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from 'src/app/modules/shared/models/member.model';
import { Practitioner } from 'src/app/modules/shared/models/practitioner.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookingTransformService } from 'src/app/services/booking-transform.service';
import { MemberService } from 'src/app/services/member.service';
import { PractitionerService } from 'src/app/services/practitioner.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  currentPerson$: Observable<Practitioner> | undefined;
  currentEntityNo = 0;
  constructor(private activeRoute: ActivatedRoute, private practitionerService: PractitionerService) {}

  ngOnInit(): void {
    this.currentEntityNo = Number(this.activeRoute.snapshot.params['id']);
    this.currentPerson$ = this.practitionerService.getPractitioner(this.currentEntityNo);
  }
}
