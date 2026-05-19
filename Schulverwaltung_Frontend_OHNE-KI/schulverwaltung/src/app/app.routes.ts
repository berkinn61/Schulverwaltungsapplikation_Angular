import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard';
import { SchuelerListComponent } from './pages/schueler-list/schueler-list';
import { SchuelerAddComponent } from './pages/schueler-add/schueler-add';
import { KlassenraumListComponent } from './pages/klassenraum-list/klassenraum-list';
import { KlassenraumAddComponent } from './pages/klassenraum-add/klassenraum-add';
import { AnalyticsComponent } from './pages/analytics/analytics';

export const routes: Routes = [
  { path: '', component: DashboardComponent },

  { path: 'schueler', component: SchuelerListComponent },
  { path: 'schueler-add', component: SchuelerAddComponent },

  { path: 'klassenraeume', component: KlassenraumListComponent },
  { path: 'klassenraeume-add', component: KlassenraumAddComponent },

  { path: 'analytics', component: AnalyticsComponent }
];