
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CreateFactService {

  constructor(private http: HttpClient) { }



  CreateFact(id_package: string,name: string,description: string,  content: string) {
    const body = {
      name: name,
      description: description,
      content: content,
    };
    return this.http.post(`http://localhost:3000/api/${id_package}/new_fact`, body)

  }
}

