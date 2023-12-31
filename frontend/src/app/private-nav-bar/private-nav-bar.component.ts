import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DisconnectService} from "./disconnect.service";
import {SaveSearchService} from "../services/saveFilters.service";
import {GetuserService} from "./getuser-service";

@Component({
  selector: 'app-private-nav-bar',
  templateUrl: './private-nav-bar.component.html',
  styleUrl: './private-nav-bar.component.css'
})
export class PrivateNavBarComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(private saveSearchService: SaveSearchService, private authService: AuthService, private router: Router, private disconnectService: DisconnectService,
              private getuserService: GetuserService) {
  }

  ngOnInit() {
    const token = this.authService.getAuthToken();
    if (token === null || token === '') {
      this.router.navigate(['/']);
    } else {
      this.navtoProfil();
    }

  }

  navigateToUserWithToken(): void {
    const currentToken = this.authService.getAuthToken();

    if (currentToken) {
      // If a token exists, navigate to the user route with the current token
      this.router.navigate(['/', currentToken]);
    } else {
    }
  }

  onButtonClick() {
    const currentToken = this.authService.getAuthToken();
    if (currentToken && currentToken != '') {
      this.disconnectService.disconnect(currentToken)
        .subscribe(
          (response: any) => {
            this.authService.clearAuthToken()
            this.router.navigate(['/']);
          },
        );
    }
  }

  navAllPack() {

    const searchParameters = {
      title: '',
      category: '',
      targetAudience: '',
      difficultyLevel: 0,
      isLike: false,
      created: false
    };
    this.saveSearchService.setSavedSearch(searchParameters);
    this.router.navigate(['/search-package']);
  }

  navYourPack() {

    const searchParameters = {
      title: '',
      category: '',
      targetAudience: '',
      difficultyLevel: 0,
      isLike: false,
      created: true

    };
    this.saveSearchService.setSavedSearch(searchParameters);
    this.router.navigate(['/search-package/your_packages']);
  }

  navtoProfil() {
    const currentToken = this.authService.getAuthToken();
    if (currentToken && currentToken != '') {
      console.log(currentToken);
      this.getuserService.getUsername(currentToken).subscribe(
        (response: any) => {
          console.log(response)
          this.router.navigate(['user', response.username]);
        },
      );
    }
  }
}
