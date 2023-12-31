// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisconnectService {

  constructor(private http: HttpClient) { }

  disconnect(token : string): Observable<any> {
    const body = {};
    return this.http.put(`http://localhost:3000/api/disconnect/${token}`, body);
  }
}
