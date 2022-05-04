import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './pages/booking/booking.component';
import { SearchComponent } from './pages/search/search.component';
import { AnonymGuard } from './guards/anonym.guard';
import { AuthGuard } from './guards/auth.guard';
import { PermissionGuard } from './guards/permission.guard';
import { Roles } from './modules/shared/models/roles.model';
import { DoctorRoutes, PatientRoutes, SharedRoutes } from './modules/shared/models/routes.model';

import { HomeComponent } from './pages/home/home.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UpcomingConsultationsComponent } from './pages/upcoming-consultations/upcoming-consultations.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [AnonymGuard],
  },

  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: SharedRoutes.Dashboard,
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: PatientRoutes.Search,
        component: SearchComponent,
        canActivate: [PermissionGuard],
        data: {
          role: Roles.Patient,
        },
      },
      {
        path: PatientRoutes.Booking,
        component: BookingComponent,
        canActivate: [PermissionGuard],
        data: {
          role: Roles.Patient,
        },
      },
      {
        path: SharedRoutes.UpcomingConsultations,
        component: UpcomingConsultationsComponent,
      },
      {
        path: PatientRoutes.HealthRecords,
        loadChildren: () => import('./modules/health-records/health-records.module').then(m => m.HealthRecordsModule),
        canActivate: [PermissionGuard],
        data: {
          role: Roles.Patient,
        },
      },
      {
        path: DoctorRoutes.ConsultationRequests,
        loadChildren: () =>
          import('./modules/consultation-requests/consultation-requests.module').then(
            m => m.ConsultationRequestsModule
          ),
        canActivate: [PermissionGuard],
        data: {
          role: Roles.Doctor,
        },
      },
      {
        path: DoctorRoutes.Patients,
        loadChildren: () => import('./modules/patients/patients.module').then(m => m.PatientsModule),
        canActivate: [PermissionGuard],
        data: {
          role: Roles.Doctor,
        },
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
