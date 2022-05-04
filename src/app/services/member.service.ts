import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Member } from '../modules/shared/models/member.model';
import { baseApi } from '../modules/shared/utils/customTokens';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private http: HttpClient, @Inject(baseApi) private baseUrl: string) {}

  api = ` ${this.baseUrl}/member/`;

  getMemberList() {
    return this.http.get<Member[]>(`${this.api}`);
  }

  getMember(entityNo: number) {
    return this.http.get<Member>(`${this.api}${entityNo}`);
  }

  searchMember(firstName: string, lastName: string) {
    let params = new HttpParams();
    if (firstName) params = params.set(`firstName`, firstName);
    if (lastName) params = params.set(`lastName`, lastName);

    return this.http.get<Member[]>(`${this.api}search`, { params });
  }
}
