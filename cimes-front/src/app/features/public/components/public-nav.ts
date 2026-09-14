import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandMarkComponent } from '../../../shared/icons';

@Component({
  selector: 'app-public-nav',
  imports: [RouterLink, BrandMarkComponent],
  template: `
    <header class="topnav">
      <div class="container topnav-inner">
        <a class="brand" routerLink="/"><app-brand-mark /><span>Cimes</span></a>
        <nav class="navlinks">
          <a href="#pistes-section">Pistes</a>
          <a href="#cours-section">Cours</a>
          <a href="#abonnements-section">Abonnements</a>
        </nav>
        <div class="topnav-actions">
          <a class="btn btn-ghost-light btn-sm" routerLink="/login">Se connecter</a>
        </div>
      </div>
    </header>
  `,
})
export class PublicNavComponent {}
