import { Pipe, PipeTransform } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Booking } from '../models/booking.model';
import { capitalizeCredentials, getOppositePerson } from '../utils/helpers.fn';

@Pipe({
  name: 'oppositeRoleCredentials',
})
export class OppositeRoleCredentialsPipe implements PipeTransform {
  constructor(private authService: AuthenticationService) {}

  transform(booking: Booking): string {
    console.log(booking);
    
    const oppositeRole = getOppositePerson(booking, this.authService.role);
    if (!oppositeRole) return '';

    return `${capitalizeCredentials(oppositeRole?.firstName, oppositeRole?.lastName)}`;
  }
}
