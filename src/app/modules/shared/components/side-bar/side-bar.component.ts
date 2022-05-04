import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faHome,
  faUserNurse,
  faCalendarDays,
  faBookMedical,
  faHospitalUser,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';
import { NbSidebarService } from '@nebular/theme';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Roles } from '../../models/roles.model';
import { DoctorRoutes, PatientRoutes, SharedRoutes } from '../../models/routes.model';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  //#region variables
  faHome = faHome;
  faUserNurse = faUserNurse;
  faCalendarDays = faCalendarDays;
  faBookMedical = faBookMedical;
  faHospitalUser = faHospitalUser;
  faCalendarCheck = faCalendarCheck;
  activeClass = `sidebar__button--active`;
  iconsAreVisible = false;

  sharedRoutes = SharedRoutes;
  doctorRoutes = DoctorRoutes;
  patientRoutes = PatientRoutes;

  role: number | undefined;
  roles = Roles;

  //#endregion
  constructor(private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.role = this.authService.role;
  }

  makeActive() {
    return this.router.url.includes('/booking/');
  }
}
