import { AttendeeType, Booking, BookingResponse, BookingStatus } from '../models/booking.model';
import { Member } from '../models/member.model';
import { Practitioner } from '../models/practitioner.model';

export const lettersOnly = (event: KeyboardEvent) => {
  const onlyLetters = RegExp('[A-Za-z]');
  return onlyLetters.test(event.key);
};

export const flattenBookings = (bookings: BookingResponse) => {
  const keys = Object.keys(bookings.bookingMap).reverse();
  return keys.map(key => bookings.bookingMap[key]).flat();
};

export const capitalize = (text: string) => {
  return `${text[0].toUpperCase()}${text.slice(1)} `;
};

export const capitalizeCredentials = (firstName: string, lastName: string) => {
  //space is needed so nb-user will generate credentials only from first name
  return `${capitalize(firstName)} ${capitalize(lastName)}`;
};
export const createUpdateBody = (updateType: BookingStatus) => {
  return {
    bookingStatus: updateType,
    comment: '',
    includeDependent: false,
  };
};

export const buildBookingBody = (
  currentRole: number,
  memberEntityNo: number,
  memberfirstName: string,
  memberLastName: string,
  doctorEntityNo: number,
  doctorFirstName: string,
  doctorLastName: string,
  startDate: Date,
  endDate: Date
) => {
  return {
    attendees: [
      {
        attendeeType: AttendeeType.PATIENT,
        entity: {
          entityNo: memberEntityNo,
          firstName: memberfirstName,
          lastName: memberLastName,
        },
        entityNo: memberEntityNo,
      },
      {
        attendeeType: AttendeeType.PROVIDER,
        entity: {
          entityNo: doctorEntityNo,
          firstName: doctorFirstName,
          lastName: doctorLastName,
        },
        entityNo: doctorEntityNo,
      },
    ],
    description: 'string',
    endDate: endDate.toISOString(),
    id: 0,
    organiser: currentRole,
    startDate: startDate.toISOString(),
    title: 'string',
  };
};

export const getUserTitle = (doctor: Practitioner | Member | undefined) => {
  if (doctor && 'practiceName' in doctor) {
    return doctor.practiceName;
  }
  return '';
};

export const getOppositePerson = (booking: Booking, role: number) => {
  return booking.attendees.find(atendee => atendee.entityNo !== role)?.entity;
};
