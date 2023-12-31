import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {PublicNavBarComponent} from "./public-nav-bar/public-nav-bar.component";
import {PublicHomeComponent} from "./public-home/public-home.component";
import {PrivateNavBarComponent} from "./private-nav-bar/private-nav-bar.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {SearchPackageComponent} from "./search-package/search-package.component";
import {PackageComponent} from "./package/package.component";
import {FactsComponent} from "./facts/facts.component";
import {CreatePackageComponent} from "./create-package/create-package.component";
import {UpdatePackageComponent} from "./update-package/update-package.component";
import {CreateFactComponent} from "./create-fact/create-fact.component";
import {ProfilComponent} from "./profil/profil.component";

const routes: Routes = [
  { path: 'public', component: PublicNavBarComponent},
  { path : 'private', component: PrivateNavBarComponent},
  { path: 'login', component: LoginComponent},
  {path: 'public-home', component: PublicHomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'search-package', component: SearchPackageComponent},
  {path: 'search-package/your_packages', component: SearchPackageComponent},
  {path: 'package/:id_package', component: PackageComponent},
  {path: 'facts/:id_package', component: FactsComponent},
  {path: 'create_new_package', component: CreatePackageComponent},
  {path: 'update_package/:id_package', component: UpdatePackageComponent},
  {path: 'create_new_fact/:id_package', component: CreateFactComponent},
  {path: 'user/:username', component: ProfilComponent},
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true})
  ]
})
export class AppRoutingModule { }
