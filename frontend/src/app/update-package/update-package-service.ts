
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpdatePackageService {

  constructor(private http: HttpClient) { }

  getPackageByID(id_package: string){
    return this.http.get(`http://localhost:3000/api/package_by_id/${id_package}`)
  }



  UpdatePackage(token: string,id_package : string, title: string,description: string,  category: string, targetAudience: string, difficultyLevel: number, isPublic: boolean) {
    const body = {
      title: title,
      description: description,
      category: category,
      targetAudience: targetAudience,
      difficultyLevel: difficultyLevel,
      isPublic: isPublic
    };
    return this.http.put(`http://localhost:3000/api/update/${token}/${id_package}`, body)
  }


}
