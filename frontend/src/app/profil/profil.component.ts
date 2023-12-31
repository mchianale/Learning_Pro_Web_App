import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from '@angular/router';
import {ProfilService} from "./profil-service";


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit{
  username= "";
  total_learned = 0;
  total_created = 0;
  meanDifficulty = 0;
  categories : any[] = [];

  constructor(private router : Router,
              private authService: AuthService,
              private profilService: ProfilService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.profilService.getUserInformation(this.username).subscribe(
        (response: any) => {
          this.total_learned = response.total_learned;
          this.total_created = response.total_created;
          this.meanDifficulty = response.meanDifficulty;
          this.categories = response.categories;

        },
        (error: any) => {
          console.error('Error fetching user information:', error);
        }
      );
    });
  }

  getDifficultyColor(level: number): string {
    const hue = 120 - ((level / 20) * 120);
    return `hsl(${hue}, 100%, 50%)`;
  }


}
