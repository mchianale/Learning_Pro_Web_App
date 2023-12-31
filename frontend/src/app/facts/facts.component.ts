import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FactsService} from "./facts-service";
import {ActivatedRoute, Router} from '@angular/router';
import {SaveSearchService} from "../services/saveFilters.service";
@Component({
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  styleUrl: './facts.component.css'
})
export class FactsComponent implements OnInit{
  id_package = "";
  learning_facts: any[] = [];
  currentPage: number = 0;
  pageSize: number = 1;
  full_size = 0;
  remain_items: any[] = []
  errorMessage = '';
  isLearned = false;

  constructor(private factsService: FactsService ,private router : Router,
              private authService: AuthService,
              private route: ActivatedRoute) {}
  ngOnInit(): void {

      this.route.params.subscribe(params => {
        this.id_package= params['id_package'];
      });
      this.getFactsForPage(this.currentPage);
      this.learn(1);
  }

  getFactsForPage(page: number): void {
    this.factsService.getFactsForPage(page,
      this.pageSize, this.id_package)
      .subscribe((data) => {
        this.learning_facts  = data.facts;
        this.full_size = data.full_size;
        this.remain_items = []
        for(let i = 0; i < this.pageSize - data.facts.length; i++) {
          this.remain_items.push({});
        }

      });
  }

  hasMorePages(): boolean {
    // Calculate the total number of pages
    const totalPages = Math.ceil(this.full_size/ this.pageSize);
    // Check if there are more pages
    return this.currentPage < totalPages - 1;
  }
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getFactsForPage(this.currentPage);

    }
  }
  nextPage(): void {
    this.currentPage++;
    this.getFactsForPage(this.currentPage);
  }

  goBack(): void {
    this.router.navigate(['/package', this.id_package]);
  }
  learn(check: number) {
    const token = this.authService.getAuthToken()
    if (token !== null && token !== '') {
      this.factsService.learnPackage(token, this.id_package, check) .subscribe((response: any) => {
        this.isLearned = response.isLearned;
        console.log('l', this.isLearned);
      });
    }
  }
}
