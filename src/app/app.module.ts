import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthModule } from './modules/auth/auth.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { baseApi, googleMapsKey } from './modules/shared/utils/customTokens';
import { BookingComponent } from './pages/booking/booking.component';
import { SearchComponent } from './pages/search/search.component';
import { UpcomingConsultationsComponent } from './pages/upcoming-consultations/upcoming-consultations.component';

@NgModule({
  declarations: [AppComponent, MainPageComponent, HomeComponent, NotFoundComponent, SearchComponent, BookingComponent, UpcomingConsultationsComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    SharedModule,
    BrowserAnimationsModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: baseApi, useValue: environment.baseApi },
    { provide: googleMapsKey, useValue: environment.googleMapsApiKey },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
