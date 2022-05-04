import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Practitioner } from '../modules/shared/models/practitioner.model';
import { baseApi } from '../modules/shared/utils/customTokens';

@Injectable({
  providedIn: 'root',
})
export class PractitionerService {
  constructor(private http: HttpClient, @Inject(baseApi) private baseUrl: string) {}

  api = ` ${this.baseUrl}/practitioner/`;

  getPractitionerList() {
    return this.http.get<Practitioner[]>(`${this.api}`);
  }
  getPractitioner(entityNo: number) {
    return this.http.get<Practitioner>(`${this.api}${entityNo}`);
  }
  searchPractitioner(firstName: string, lastName: string) {
    let params = new HttpParams();
    if (firstName) params = params.set(`firstName`, firstName);
    if (lastName) params = params.set(`lastName`, lastName);

    return this.http.get<Practitioner[]>(`${this.api}search`, { params });
  }
}
