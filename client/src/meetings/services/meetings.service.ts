import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROOT } from '../../app/core/api-config';

@Injectable({
  providedIn: 'root',
})
export class MeetingsService {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_ROOT) private readonly apiRoot: string
  ) {}

  getMeetings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiRoot}/api/meetings`);
  }
}
