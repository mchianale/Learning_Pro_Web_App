import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {CreatePackageService} from "./create-package-service";
import {SaveSearchService} from "../services/saveFilters.service";
@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrl: './create-package.component.css'
})
export class CreatePackageComponent {
  errorMessage: string | null = null;
  token = "";
  title: string = "";
  description: string = "";
  category = "";
  id_package = "";
  categories: string[] = [
    'Design',
    'Web Development',
    'Data Science',
    'Machine Learning',
    'Digital Marketing',
    'Project Management',
    'Cybersecurity',
    'Cloud Computing',
    'Game Development',
    'Mobile App Development'
  ];
  targetAudience = "";
  difficultyLevel = 0;
  difficultyLevels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  isPublic = false;
  constructor(private saveSearchService: SaveSearchService,private createPackageService: CreatePackageService, private authService: AuthService, private router: Router) {}

  onSubmit() {
    const token_ = this.authService.getAuthToken();
    if (token_ === null || token_ === '') {
      this.router.navigate(['/']);
    }
    else{
      this.token = token_;
    }
    this.createPackageService.CreatePackage(this.token, this.title, this.description, this.category, this.targetAudience, this.difficultyLevel, this.isPublic)
      .subscribe(
        (response: any) => {
          // Assuming the backend returns a token upon successful login
         this.id_package = response.id_package;
          const searchParameters =  {
            title: '',
            category: '',
            targetAudience: '',
            difficultyLevel : 0,
            isLike : false,
            created: true

          };
          this.saveSearchService.setSavedSearch(searchParameters);
         this.router.navigate(['/search-package/your_packages']);
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
  }

}
