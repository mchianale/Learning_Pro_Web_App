import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {PackageService} from "./package-service";
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrl: './package.component.css'
})
export class PackageComponent implements OnInit{
  id_package = "";
  errorMessage = "";
  isUser = false;
  username = "";
  category = "";
  title = "";
  description = "";
  targetAudience = "";
  difficultyLevel = 0;
  n_facts = 0;
  constructor(private router : Router,
              private authService: AuthService,
              private packageService: PackageService,
              private route: ActivatedRoute) {}


  ngOnInit(): void {
    const token = this.authService.getAuthToken()
    if (token !== null && token !== ''){
      this.route.params.subscribe(params => {
        this.id_package= params['id_package'];
      });
      this.packageService.getPackageByID(this.id_package).subscribe(
        (response: any) => {

          const pack = response.pack[0];
          this.title = pack.title;
          this.username = pack.username;
          this.category = pack.category;
          this.targetAudience = pack.targetAudience;
          this.difficultyLevel = pack.difficultyLevel;
          this.description = pack.description;
          this.packageService.checkUserPackage(token, this.id_package).subscribe(
            (response: any) => {
             this.isUser = response.isUser;
             this.packageService.getFacts(this.id_package).subscribe(
               (response: any) => {
                 this.n_facts= response.facts.length;
               },
               (error) => {
                 this.errorMessage = error.error.message;
               }
             );
            },
            (error) => {
              this.errorMessage = error.error.message;
            }
          );
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
    }
    else {
      this.router.navigate(['/']);
    }
  }
  goBack(): void {
    this.router.navigate(['/search-package']);
  }

  getDifficultyColor(level: number): string {
    const hue = 120 - ((level / 20) * 120);
    return `hsl(${hue}, 100%, 50%)`;
  }

  StartLearn() {
    this.router.navigate(['/facts', this.id_package]);
  }

  goToUpdate() {
    this.router.navigate(['/update_package', this.id_package])
  }

  goToAddFact() {
    this.router.navigate(['/create_new_fact', this.id_package])
  }

  goToUserProfil(username : string)  {
    this.router.navigate(['user', username]);
  }
}
