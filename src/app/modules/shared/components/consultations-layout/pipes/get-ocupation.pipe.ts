import { Pipe, PipeTransform } from '@angular/core';
import { catchError, EMPTY, map, Observable, of } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PractitionerService } from 'src/app/services/practitioner.service';
import { Booking } from '../../../models/booking.model';
import { Roles } from '../../../models/roles.model';
import { getOppositePerson } from '../../../utils/helpers.fn';

@Pipe({
  name: 'getOcupation',
})
export class GetOcupationPipe implements PipeTransform {
  constructor(private authService: AuthenticationService, private practitionerService: PractitionerService) {}

  transform(booking: Booking): Observable<string> {
    const entityNo = getOppositePerson(booking, this.authService.role)?.entityNo;

    if (entityNo && entityNo !== Roles.Patient) {
      return this.practitionerService.getPractitioner(entityNo).pipe(
        map(doctor => doctor.practiceName),
        catchError(() => '')
      );
    }
    // space is needed, otherwise it would convert to false
    return of(' ');
  }
}
