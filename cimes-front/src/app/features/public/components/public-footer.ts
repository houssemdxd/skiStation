import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandMarkComponent } from '../../../shared/icons';

@Component({
  selector: 'app-public-footer',
  imports: [RouterLink, BrandMarkComponent],
  template: `
    <footer>
      <div class="container">
        <div class="footer-top">
          <div>
            <div class="brand"><app-brand-mark [size]="20" /><span>Cimes</span></div>
            <p style="max-width:280px;font-size:14px;line-height:1.6;margin-top:10px;">
              Station de ski gérée de bout en bout — pistes, cours, moniteurs et abonnements.
            </p>
          </div>
          <div class="footer-cols">
            <div class="footer-col">
              <h5>Explorer</h5>
              <a routerLink="/" fragment="pistes-section">Pistes</a>
              <a routerLink="/" fragment="cours-section">Cours</a>
              <a routerLink="/" fragment="abonnements-section">Abonnements</a>
            </div>
            <div class="footer-col">
              <h5>Espace</h5>
              <a routerLink="/login" [queryParams]="{role:'skieur'}">Skieur</a>
              <a routerLink="/login" [queryParams]="{role:'moniteur'}">Moniteur</a>
              <a routerLink="/login" [queryParams]="{role:'admin'}">Administration</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 Cimes — Station de ski</span>
          <span>Chamrousse-sur-Glace, France</span>
        </div>
      </div>
    </footer>
  `,
})
export class PublicFooterComponent {}
