import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const SKIEUR_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    data: { role: 'skieur' },
    loadComponent: () =>
      import('../dashboard/dashboard-shell/dashboard-shell').then((m) => m.DashboardShellComponent),
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        loadComponent: () => import('./skieur-overview').then((m) => m.SkieurOverviewComponent),
      },
      {
        path: 'cours',
        loadComponent: () => import('./skieur-cours').then((m) => m.SkieurCoursComponent),
      },
      {
        path: 'pistes',
        loadComponent: () => import('./skieur-pistes').then((m) => m.SkieurPistesComponent),
      },
      {
        path: 'abonnement',
        loadComponent: () => import('./skieur-abonnement').then((m) => m.SkieurAbonnementComponent),
      },
    ],
  },
];
