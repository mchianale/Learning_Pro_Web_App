// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetuserService {

  constructor(private http: HttpClient) { }

  getUsername(token : string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/user/${token}/get_username`);
  }
}
