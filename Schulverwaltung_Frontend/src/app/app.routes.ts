import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent)
  },
  {
    path: 'schueler',
    loadComponent: () => import('./features/schueler/schueler.component').then((m) => m.SchuelerComponent)
  },
  {
    path: 'schueler/add',
    loadComponent: () => import('./features/schueler/schueler-add.component').then((m) => m.SchuelerAddComponent)
  },
  {
    path: 'klassenraeume',
    loadComponent: () => import('./features/klassenraeume/klassenraum.component').then((m) => m.KlassenraumComponent)
  },
  {
    path: 'klassenraeume/add',
    loadComponent: () => import('./features/klassenraeume/klassenraum-add.component').then((m) => m.KlassenraumAddComponent)
  },
  {
    path: 'analytics',
    loadComponent: () => import('./features/analytics/analytics.component').then((m) => m.AnalyticsComponent)
  },
  { path: '**', redirectTo: 'dashboard' }
];
