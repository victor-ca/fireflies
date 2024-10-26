import { Component, OnInit } from '@angular/core';
import { MeetingsService } from '../services/meetings.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './meeting-list.component.html',
  styleUrl: './meeting-list.component.scss',
})
export class MeetingListComponent implements OnInit {
  meetings$!: Observable<any[]>;
  constructor(private readonly meetingsService: MeetingsService) {}

  ngOnInit() {
    this.meetings$ = this.meetingsService.getMeetings();
  }
}
