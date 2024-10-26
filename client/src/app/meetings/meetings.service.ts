import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROOT } from '../core/api-config';

@Injectable({
  providedIn: 'root',
})
export class MeetingsService {
  constructor(
    private http: HttpClient,
    @Inject(API_ROOT) private apiRoot: string
  ) {}

  getMeetings() {
    return this.http.get(`${this.apiRoot}/meetings`);
  }
}
