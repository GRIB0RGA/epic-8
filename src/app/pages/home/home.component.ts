import { Component, OnInit } from '@angular/core';
import { AuthRoutes } from 'src/app/modules/shared/models/routes.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  authRoutes = AuthRoutes;

  ngOnInit(): void {}
}
