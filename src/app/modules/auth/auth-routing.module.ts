import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymGuard } from 'src/app/guards/anonym.guard';

import { AuthRoutes } from '../shared/models/routes.model';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: AuthRoutes.Login,
    component: LoginComponent,
    canActivate: [AnonymGuard],
  },
  {
    path: AuthRoutes.Register,
    component: RegisterComponent,
    canActivate: [AnonymGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
