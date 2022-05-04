import { Component, OnInit } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss'],
})
export class GoBackComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  constructor() {}

  ngOnInit(): void {}
}
