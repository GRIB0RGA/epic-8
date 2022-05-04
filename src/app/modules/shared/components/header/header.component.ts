import { Component, OnInit } from '@angular/core';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookingService } from 'src/app/services/booking.service';
import { capitalize, capitalizeCredentials } from '../../utils/helpers.fn';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faSignOut = faSignOut;
  currentUser: string | undefined;

  constructor(private authService: AuthenticationService,private bookingService:BookingService) {}

  ngOnInit(): void {
    this.generateUserCredentials();
    
    //just for deleting
    // for (let i = 0; i < 100; i++) {
    //   // this.bookingService.deleteBooking(i).subscribe()
    //  }

    
  }

  signOut() {
    this.authService.signOut().subscribe();
  }

  generateUserCredentials() {
    const user = this.authService.currentUser;
    this.currentUser = `${capitalizeCredentials(user.firstName, user.lastName)}`;
  }
}
