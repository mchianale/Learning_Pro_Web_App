// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(username: string, mail: string, firstname: string, lastname: string, password: string): Observable<any> {
    const body = {
      username: username,
      mail: mail,
      firstname: firstname,
      lastname: lastname,
      mdp: password
    };
    return this.http.post(`http://localhost:3000/api/register`, body);
  }
}
