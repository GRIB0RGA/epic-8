import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MemberService } from 'src/app/services/member.service';
import { PractitionerService } from 'src/app/services/practitioner.service';
import { Member } from '../../models/member.model';
import { Practitioner } from '../../models/practitioner.model';
import { Roles } from '../../models/roles.model';
import { capitalize, capitalizeCredentials, getUserTitle } from '../../utils/helpers.fn';

@Component({
  selector: 'app-search-shell',
  templateUrl: './search-shell.component.html',
  styleUrls: ['./search-shell.component.scss'],
})
export class SearchShellComponent implements OnInit {
  searchResults$: Observable<Practitioner[] | Member[]>  | undefined;
  firstName = '';
  lastName = '';

  constructor(
    private practitionerService: PractitionerService,
    private memberService: MemberService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.searchResults$ = this.getStartingList();
  }


  getCredentials =capitalizeCredentials
  getTitle = getUserTitle;

  getStartingList() {
    return this.authService.role === Roles.Doctor
      ? this.memberService.getMemberList()
      : this.practitionerService.getPractitionerList();
  }

  getSearchList(firstName: string, lastName: string) {
    return this.authService.role === Roles.Doctor
      ? this.memberService.searchMember(firstName, lastName)
      : this.practitionerService.searchPractitioner(firstName, lastName);
  }

  search() {
    if (!this.firstName && !this.lastName) {
      this.searchResults$ = this.getStartingList();
      return;
    }
    this.searchResults$ = this.getSearchList(this.firstName, this.lastName);
    this.firstName = '';
    this.lastName = '';
  }

  book(result: Practitioner | Member) {
    if (this.authService.role === Roles.Patient) {
      this.router.navigate(['/booking', result.entityNo]);
    }
  }
}
