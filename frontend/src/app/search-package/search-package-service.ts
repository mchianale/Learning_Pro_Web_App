
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchPackageService {

  constructor(private http: HttpClient) { }

  getPackagesForPage(page: number, pageSize: number,
                    title: string, category: string,targetAudience: string,difficultyLevel :number,
                    isLike: boolean, created: boolean, token: string){
    const startIndex = page * pageSize;
    const body = {
      "title": title,
      "category": category,
      "targetAudience":targetAudience,
      "difficultyLevel": difficultyLevel,
      "isLike": isLike,
      "created": created
    }
    return this.http.post(`http://localhost:3000/api/packages/search_by_filters/${token}`, body).pipe(
      map((response: any) => {
        const packages= response?.PackFiltered;

        if (Array.isArray(packages)) {
          return {packages: packages.slice(startIndex, startIndex + pageSize), full_size:  packages.length} ;
        } else {
          // Handle the case where exercises is not an array
          console.error('Unexpected data format for packages:', response);
          return {packages: [],full_size: 0};
        }
      })
    );
  }


}
