import { Member } from './member.model';

export interface Booking {
  id: number;
  attendees: Attendee[];
  description: string;
  endTime: string;
  startTime: string;
  status: BookingStatus;
  statusComment: string;
  title: string;
}

// Post
export interface BookingRequest {
  attendees: Attendee[];
  description: string;
  endDate: string;
  startDate: string;
  id: number;
  organiser: number;
  title: string;
}

// Put
export interface BookingStatusUpdateRequest {
  bookingStatus: BookingStatus;
  comment: string;
  includeDependent: boolean;
}

//get
export interface BookingResponse {
  bookingMap: Record<string, Booking[]>;
  startDate: string;
  endDate: string;
}

export interface Attendee {
  attendeeType: AttendeeType;
  entity: Member;
  entityNo: number;
}
export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  TENTATIVE = 'TENTATIVE',
  DECLINED = 'DECLINED',
  CANCELLED = 'CANCELLED',
}
export enum AttendeeType {
  PATIENT = 'PATIENT',
  PROVIDER = 'PROVIDER',
}
