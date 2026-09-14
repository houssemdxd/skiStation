import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    data: { role: 'admin' },
    loadComponent: () =>
      import('../dashboard/dashboard-shell/dashboard-shell').then((m) => m.DashboardShellComponent),
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        loadComponent: () => import('./admin-overview').then((m) => m.AdminOverviewComponent),
      },
      {
        path: 'cours',
        loadComponent: () => import('./admin-cours').then((m) => m.AdminCoursComponent),
      },
      {
        path: 'pistes',
        loadComponent: () => import('./admin-pistes').then((m) => m.AdminPistesComponent),
      },
      {
        path: 'moniteurs',
        loadComponent: () => import('./admin-moniteurs').then((m) => m.AdminMoniteursComponent),
      },
      {
        path: 'skieurs',
        loadComponent: () => import('./admin-skieurs').then((m) => m.AdminSkieursComponent),
      },
      {
        path: 'inscriptions',
        loadComponent: () => import('./admin-inscriptions').then((m) => m.AdminInscriptionsComponent),
      },
      {
        path: 'abonnements',
        loadComponent: () => import('./admin-abonnements').then((m) => m.AdminAbonnementsComponent),
      },
      {
        path: 'affectations',
        loadComponent: () => import('./admin-affectations').then((m) => m.AdminAffectationsComponent),
      },
    ],
  },
];
