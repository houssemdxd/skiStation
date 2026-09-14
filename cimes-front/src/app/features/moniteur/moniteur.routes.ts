import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const MONITEUR_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    data: { role: 'moniteur' },
    loadComponent: () =>
      import('../dashboard/dashboard-shell/dashboard-shell').then((m) => m.DashboardShellComponent),
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        loadComponent: () => import('./moniteur-overview').then((m) => m.MoniteurOverviewComponent),
      },
      {
        path: 'planning',
        loadComponent: () => import('./moniteur-planning').then((m) => m.MoniteurPlanningComponent),
      },
      {
        path: 'eleves',
        loadComponent: () => import('./moniteur-eleves').then((m) => m.MoniteurElevesComponent),
      },
    ],
  },
];
