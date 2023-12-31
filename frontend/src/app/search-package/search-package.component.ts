import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SaveSearchService} from "../services/saveFilters.service";
import {SearchPackageService} from "./search-package-service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-search-package',
  templateUrl: './search-package.component.html',
  styleUrl: './search-package.component.css'
})
export class SearchPackageComponent implements OnInit{
  token = "";
  //filters
  title: string = "";
  category = "";
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
  isLike = false;
  created = false;

  //Pagination system
  learning_packages : any[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  full_size = 0;
  remain_items: any[] = []
  errorMessage = '';
  //filters
  showAddFiltersForm = false;
  constructor(private searchPackagesService: SearchPackageService  ,private router : Router,
              private saveSearchService : SaveSearchService, private authService: AuthService) {}

  ngOnInit(): void {

    const token_ = this.authService.getAuthToken();
    if (token_ === null || token_ === '') {
      this.router.navigate(['/']);
    }
    else{
      this.token = token_;
    }

    const savedSearch= this.saveSearchService.getSavedSearch();
    this.title = savedSearch.title;
    this.category = savedSearch.category;
    this.targetAudience = savedSearch.targetAudience;
    this.difficultyLevel = savedSearch.difficultyLevel;
    this.isLike = savedSearch.isLike;
    this.created = savedSearch.created;
    this.getPackagesForPage(this.currentPage);


  }
  saveSearch(): void {
    const searchParameters =  {
      title: this.title,
      category: this.category,
      targetAudience: this.targetAudience,
      difficultyLevel : this.difficultyLevel,
      isLike : this.isLike,
      created: this.created

    };
    this.saveSearchService.setSavedSearch(searchParameters);
  }

  getPackagesForPage(page: number): void {
    this.searchPackagesService.getPackagesForPage(page,
      this.pageSize, this.title, this.category, this.targetAudience, this.difficultyLevel, this.isLike, this.created, this.token)
      .subscribe((data) => {
        this.learning_packages  = data.packages;
        this.full_size = data.full_size;
        this.remain_items = []
        let l =this.pageSize - data.packages.length;
        if (this.created) {
          l = this.pageSize - data.packages.length - 1;
        }
        for(let i = 0; i < l; i++) {
          this.remain_items.push({});
        }
      });

  }

  applyFilters(): void {
    this.searchPackagesService.getPackagesForPage(0,
      this.pageSize, this.title, this.category, this.targetAudience, this.difficultyLevel, this.isLike, this.created, this.token)
      .subscribe((data) => {
        this.learning_packages = data.packages;
        this.full_size = data.full_size;
      });
    this.saveSearch();
    this.currentPage = 0;
    this.toggleSidePanel();
    this.router.navigate(['/search-package']);

  }
  resetFilters() :void {
    this.title = '';
    this.category = '';
    this.targetAudience = '';
    this.difficultyLevel = 0;
    this.isLike = false;
    this.created = false;
    this.searchPackagesService.getPackagesForPage(0,
      this.pageSize, this.title, this.category, this.targetAudience, this.difficultyLevel, this.isLike, this.created, this.token)
      .subscribe((data) => {
        this.learning_packages  = data.packages;
        this.full_size = data.full_size;
      });
    this.saveSearch();
    this.currentPage = 0;
    this.toggleSidePanel();

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
      this.getPackagesForPage(this.currentPage);
    }
  }
  nextPage(): void {
    this.currentPage++;
    this.getPackagesForPage(this.currentPage);
  }

  toggleSidePanel(): void {
    this.showAddFiltersForm = !this.showAddFiltersForm;
  }

  getDifficultyColor(level: number): string {
    const hue = 120 - ((level / 20) * 120);
    return `hsl(${hue}, 100%, 50%)`;
  }

  openPackage(packageId: number): void {
    this.router.navigate(['/package', packageId]);
  }

  GoToCreatePack() {
    this.router.navigate(['/create_new_package']);
  }
}
