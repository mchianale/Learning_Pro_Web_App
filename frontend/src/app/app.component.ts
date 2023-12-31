import {Component, OnInit} from '@angular/core';
import { AuthService } from './services/auth.service'
import { SaveSearchService} from "./services/saveFilters.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  constructor(private authService: AuthService,  private saveSearchService: SaveSearchService) {
  }

  ngOnInit(): void {
    //Clear session when restart
    this.authService.clearAuthToken();
    //Clear saved filters:
    this.saveSearchService.clearSavedSearch();
    // You can perform additional initialization here
    const currentToken = this.authService.getAuthToken();
  }
  isUserAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}







