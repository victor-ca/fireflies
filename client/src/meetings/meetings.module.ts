import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { API_ROOT } from '../app/core/api-config';

const routes: Routes = [{ path: '', component: MeetingListComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [
    { provide: API_ROOT, useValue: 'https://api.example.com' }, // Replace with your actual API root URL
  ],
})
export class MeetingsModule {}
