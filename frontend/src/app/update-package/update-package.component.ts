import {Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UpdatePackageService} from "./update-package-service";


@Component({
  selector: 'app-update-package',
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.css'
})
export class UpdatePackageComponent implements  OnInit{
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
  constructor(private updatePackageService: UpdatePackageService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    const token_ = this.authService.getAuthToken();
    if (token_ === null || token_ === '') {
      this.router.navigate(['/']);
    } else {
      this.token = token_;
      this.route.params.subscribe(params => {
        this.id_package = params['id_package'];
      })
    }
    this.updatePackageService.getPackageByID(this.id_package).subscribe(
      (response: any) => {
        const pack = response.pack[0];
        this.title = pack.title;
        this.category = pack.category;
        this.targetAudience = pack.targetAudience;
        this.difficultyLevel = pack.difficultyLevel;
        this.description = pack.description;}
        );
  }

  onSubmit() {

    this.updatePackageService.UpdatePackage(this.token, this.id_package, this.title, this.description, this.category, this.targetAudience, this.difficultyLevel, this.isPublic)
      .subscribe(
        (response: any) => {
          this.router.navigate(['package/', this.id_package]);
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
  }

}
