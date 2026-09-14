import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/public/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'espace/skieur',
    loadChildren: () => import('./features/skieur/skieur.routes').then((m) => m.SKIEUR_ROUTES),
  },
  {
    path: 'espace/moniteur',
    loadChildren: () => import('./features/moniteur/moniteur.routes').then((m) => m.MONITEUR_ROUTES),
  },
  {
    path: 'espace/admin',
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
