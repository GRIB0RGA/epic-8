import { Component, Inject, OnInit } from '@angular/core';

import { Loader } from '@googlemaps/js-api-loader';
import { tap } from 'rxjs';
import { googleMapsKey } from 'src/app/modules/shared/utils/customTokens';
import { PractitionerService } from 'src/app/services/practitioner.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  private map!: google.maps.Map;
  constructor(private practitionerService: PractitionerService, @Inject(googleMapsKey) private apiKey: string) {}

  ngOnInit(): void {
    this.loadMap();
  }

  loadMap() {
    let loader = new Loader({
      apiKey: this.apiKey,
    });

    loader.load().then(() => {
      const location = { lat: 41.78, lng: 44.8 };

      this.map = new google.maps.Map(document.getElementById('map') as HTMLDivElement, {
        center: location,
        zoom: 14,
        mapTypeId: 'hybrid',
        heading: 90,
        tilt: 45,
        styles: [],
      });
      this.practitionerService
        .getPractitionerList()
        .pipe(
          tap(doctors =>
            doctors.forEach(() => {
              new google.maps.Marker({
                position: { lat: location.lat + Math.random() * 0.02, lng: location.lng + Math.random() * 0.02 },
                map: this.map,
              });
            })
          )
        )
        .subscribe();
    });
  }
}
