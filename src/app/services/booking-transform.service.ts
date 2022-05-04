import { Injectable } from '@angular/core';
import { filter, forkJoin, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookingService } from 'src/app/services/booking.service';
import { AttendeeType, BookingStatus } from '../modules/shared/models/booking.model';
import { Member } from '../modules/shared/models/member.model';
import { Practitioner } from '../modules/shared/models/practitioner.model';
import { Roles } from '../modules/shared/models/roles.model';
import { buildBookingBody, flattenBookings, getOppositePerson } from '../modules/shared/utils/helpers.fn';
import { PractitionerService } from './practitioner.service';

@Injectable({
  providedIn: 'root',
})
export class BookingTransformService {
  constructor(
    private bookingService: BookingService,
    private authService: AuthenticationService,
    private practitionerService: PractitionerService
  ) {}

  getBookingsByStatus(status: BookingStatus, startDate?: string, endDate?: string) {
    return this.bookingService
      .getBookingWithEntity(this.authService.role, startDate, endDate)
      .pipe(map(bookings => flattenBookings(bookings).filter(booking => booking.status === status)));
  }

  getConsultationLayoutBookingsOfDoctors(
    startDate?: string,
    endDate?: string
  ): Observable<(Practitioner | undefined)[]> {
    return this.getBookingsByStatus(BookingStatus.CONFIRMED, startDate, endDate).pipe(
      map(bookings => bookings.map(booking => getOppositePerson(booking, Roles.Patient))),
      switchMap(oppsiteRolebookings => {
        return forkJoin(
          oppsiteRolebookings.map((oppositePerson: any) => {
            return this.practitionerService
              .getPractitioner(oppositePerson.entityNo)
              .pipe(map((doctor: Practitioner) => ({ ...oppositePerson, ...doctor,startDate })));
          })
        );
      })
    );
  }

  getConsultationLayoutBookingsOfMembers(startDate?: string, endDate?: string): Observable<(Member | undefined)[]> {
    return this.getBookingsByStatus(BookingStatus.CONFIRMED, startDate, endDate).pipe(
      map(bookings => bookings.map(booking => getOppositePerson(booking, Roles.Doctor)).filter(x => x))
    );
  }

  // booking.map(booking => {
  //         if (this.authService.role === Roles.Patient) {
  //           const practitionerEntityNo = getOppositePerson(booking, this.authService.role)?.entityNo;

  //           if (practitionerEntityNo) {
  //             return this.practitionerService.getPractitioner(practitionerEntityNo).pipe(tap(console.log));
  //           }
  //         }
  //         return of(booking);
  //       })

  getTentativeBookings() {
    return this.getBookingsByStatus(BookingStatus.TENTATIVE).pipe(map(booking => booking.slice(0, 5)));
  }

  book(entityNo: number, firstName: string, lastName: string, startDate: Date, endDate: Date) {
    return this.bookingService.createBooking(
      this.generateBookingBody(entityNo, firstName, lastName, startDate, endDate)
    );
  }

  private generateBookingBody(entityNo: number, firstName: string, lastName: string, startDate: Date, endDate: Date) {
    //#region get Booking body Data
    const roleIsDoctor = this.authService.role === Roles.Doctor;

    const doctorEntityNo = roleIsDoctor ? this.authService.role : entityNo;
    const memberEntityNo = !roleIsDoctor ? this.authService.role : entityNo;
    const doctorFirstName = roleIsDoctor ? this.authService.currentUser.firstName : firstName;
    const doctorLastName = roleIsDoctor ? this.authService.currentUser.lastName : lastName;
    const memberfirstName = !roleIsDoctor ? this.authService.currentUser.firstName : firstName;
    const memberLastName = !roleIsDoctor ? this.authService.currentUser.lastName : lastName;
    //#endregion

    return buildBookingBody(
      this.authService.role,
      memberEntityNo,
      memberfirstName,
      memberLastName,
      doctorEntityNo,
      doctorFirstName,
      doctorLastName,
      startDate,
      endDate
    );
  }
}
