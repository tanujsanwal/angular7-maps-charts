import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'data-management',
    canActivate: [AuthGuard],
    loadChildren: './modules/data-management/data-management.module#DataManagementModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
