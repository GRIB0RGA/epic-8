import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';

import {
  Booking,
  BookingRequest,
  BookingResponse,
  BookingStatusUpdateRequest,
} from '../modules/shared/models/booking.model';
import { baseApi } from '../modules/shared/utils/customTokens';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient, @Inject(baseApi) private baseUrl: string) {}

  api = `${this.baseUrl}/booking/`;

  createBooking(body: BookingRequest) {
    return this.http.post<Booking>(`${this.api}`, body);
  }

  updateBooking(bookingId: number, body: BookingStatusUpdateRequest) {
    return this.http.put<Booking>(`${this.api}${bookingId}/status`, body);
  }

  getBookingWithEntity(entityNo: number, fromDate?: string, toDate?: string) {
    let params = new HttpParams();
    if (fromDate) params = params.set(`fromDate`, fromDate);
    if (toDate) params = params.set(`toDate`, toDate);

    return this.http.get<BookingResponse>(`${this.api}attendee/${entityNo}`, { params });
  }

  //#region  i wont need this, for now at least

  deleteBooking(id: number) {
    return this.http.delete(`${this.api}${id}`).pipe(catchError(() => EMPTY));
  }
  //  getBooking(bookingId: number) {
  //   return this.http.get<any>(`${this.baseUrl}/booking/${bookingId}`);
  // }
  //  getAtendeeList() {
  //   return this.http.get<any>(`${this.baseUrl}/booking/attendee-types`);
  // }
  //#endregion
}
