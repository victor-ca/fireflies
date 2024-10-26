import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'meetings',
    loadChildren: () =>
      import('../meetings/meetings.module').then((m) => m.MeetingsModule),
  },
];
