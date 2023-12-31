
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) { }

  getPackageByID(id_package: string){
    return this.http.get(`http://localhost:3000/api/package_by_id/${id_package}`)
  }

  checkUserPackage(token: string, id_package: string) {
  return this.http.get(`http://localhost:3000/api/${token}/${id_package}`)
  }

  getFacts(id_package: string){
    return this.http.get(`http://localhost:3000/api/${id_package}`)
  }


}
