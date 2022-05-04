export enum AuthRoutes {
  Login = 'login',
  Register = 'register',
}

export enum SharedRoutes {
  Dashboard = 'dashboard',
  UpcomingConsultations = 'upcoming-consultations',
}
export enum DoctorRoutes {
  ConsultationRequests = 'consultation-requests',
  Patients = 'patients',
}

export enum PatientRoutes {
  Search = 'search',
  HealthRecords = 'health-records',
  Booking = 'booking/:id',
}
