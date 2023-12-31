import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-public-nav-bar',
  templateUrl: './public-nav-bar.component.html',
  styleUrl: './public-nav-bar.component.css'
})
export class PublicNavBarComponent implements OnInit{
  constructor(private router: Router) {

  }
  ngOnInit() {
    this.router.navigate(['/public-home'])
  }

}
