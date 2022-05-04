import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Roles } from '../shared/models/roles.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
 
  constructor(private authService: AuthenticationService) { }
  role:number | undefined
  roles=Roles
  ngOnInit(): void {
    this.role = this.authService.role;
  }
}
