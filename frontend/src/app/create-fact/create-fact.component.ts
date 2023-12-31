import { Component } from '@angular/core';
import {SaveSearchService} from "../services/saveFilters.service";
import {AuthService} from "../services/auth.service";
import {CreateFactService} from "./create-fact-service";
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-create-fact',
  templateUrl: './create-fact.component.html',
  styleUrl: './create-fact.component.css'
})
export class CreateFactComponent {
  errorMessage: string | null = null;
  token = "";
  name: string = "";
  description: string = "";
  content = "";
  id_package = "";

  constructor(private createFactService: CreateFactService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  onSubmit() {
    const token_ = this.authService.getAuthToken();
    if (token_ === null || token_ === '') {
      this.router.navigate(['/']);
    }
    else{
      this.token = token_;
      this.route.params.subscribe(params => {
        this.id_package = params['id_package'];
      })
    }
    this.createFactService.CreateFact(this.id_package, this.name, this.description, this.content)
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
