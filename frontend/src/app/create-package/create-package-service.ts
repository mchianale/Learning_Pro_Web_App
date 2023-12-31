
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CreatePackageService {

  constructor(private http: HttpClient) { }



  CreatePackage(token: string,title: string,description: string,  category: string, targetAudience: string, difficultyLevel: number, isPublic: boolean) {
    const body = {
      title: title,
      description: description,
      category: category,
      targetAudience: targetAudience,
      difficultyLevel: difficultyLevel,
      isPublic: isPublic
    };
    return this.http.post(`http://localhost:3000/api/${token}/new_package`, body)

  }
}

