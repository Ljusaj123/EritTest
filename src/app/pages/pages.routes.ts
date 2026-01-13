import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    data: {
      headerText: 'Upitnik'
    },
    loadComponent: () =>
      import('./admin/admin').then((m) => m.Admin),
  },
  {
    path: 'questionnaire',
     data: {
      headerText: 'Ispunjavanje upitnika'
    },
    loadComponent: () =>
      import('./questionnare/questionnare').then(
        (m) => m.Questionnare
      ),
  },
];
