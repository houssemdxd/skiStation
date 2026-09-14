import { Component } from '@angular/core';
import { HomeCoursComponent } from '../components/home-cours';
import { HomeHeroComponent } from '../components/home-hero';
import { HomePistesComponent } from '../components/home-pistes';
import { HomePricingComponent } from '../components/home-pricing';
import { PublicFooterComponent } from '../components/public-footer';
import { PublicNavComponent } from '../components/public-nav';

@Component({
  selector: 'app-home',
  imports: [
    PublicNavComponent,
    HomeHeroComponent,
    HomePistesComponent,
    HomeCoursComponent,
    HomePricingComponent,
    PublicFooterComponent,
  ],
  templateUrl: './home.html',
})
export class HomeComponent {}
