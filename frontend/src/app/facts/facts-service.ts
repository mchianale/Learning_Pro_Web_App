
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FactsService {

  constructor(private http: HttpClient) { }



  getFactsForPage(page: number, pageSize: number,id_package: string) {
    const startIndex = page * pageSize;
    return this.http.get(`http://localhost:3000/api/${id_package}`).pipe(
      map((response: any) => {
        const facts = response?.facts;

        if (Array.isArray(facts)) {
          const fact_ids = facts.map(f => f.id_fact);
          return {facts: facts.slice(startIndex, startIndex + pageSize),id_fact: facts[startIndex].id_fact, full_size: facts.length};
        } else {
          // Handle the case where exercises is not an array
          console.error('Unexpected data format for packages:', response);
          return {facts: [], fact_ids: [], full_size: 0};
        }
      })
    );
  }

  learnPackage(token: string, id_package: string, check: number) {
    const body = {};
    return this.http.post(`http://localhost:3000/api/learned/${token}/${id_package}/${check}`, body)

  }
}

