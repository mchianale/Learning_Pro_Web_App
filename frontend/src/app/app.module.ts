import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PrivateNavBarComponent} from "./private-nav-bar/private-nav-bar.component";
import {PublicNavBarComponent} from "./public-nav-bar/public-nav-bar.component";
import { AuthService } from './services/auth.service';
import {PublicHomeComponent} from "./public-home/public-home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {SearchPackageComponent} from "./search-package/search-package.component";
import {PackageComponent} from "./package/package.component";
import {FactsComponent} from "./facts/facts.component";
import {CreatePackageComponent} from "./create-package/create-package.component";
import {UpdatePackageComponent} from "./update-package/update-package.component";
import {CreateFactComponent} from "./create-fact/create-fact.component";
import {ProfilComponent} from "./profil/profil.component";

@NgModule({
  declarations: [
    AppComponent,
    PrivateNavBarComponent,
    PublicNavBarComponent,
    PublicHomeComponent,
    LoginComponent,
    RegisterComponent,
    SearchPackageComponent,
    PackageComponent,
    FactsComponent,
    CreatePackageComponent,
    UpdatePackageComponent,
    CreateFactComponent,
    ProfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
