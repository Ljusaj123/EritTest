import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin').then((m) => m.Admin),
  },
  {
    path: 'questionnaire',
    loadComponent: () =>
      import('./questionnare/questionnare').then(
        (m) => m.Questionnare
      ),
  },
];
