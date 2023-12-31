// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient) { }

  getUserInformation(username: string): Observable<any> {
    const body = {};
    return this.http.get(`http://localhost:3000/api/user/get_information/${username}`, body);
  }
}
