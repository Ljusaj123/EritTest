import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin').then((m) => m.Admin),
  },
  // {
  //   path: 'quiz',
  //   loadComponent: () =>
  //     import('./configuration/configuration.component').then(
  //       (m) => m.ConfigurationComponent
  //     ),
  // },
];
