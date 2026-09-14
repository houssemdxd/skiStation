import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-pricing',
  imports: [RouterLink],
  template: `
    <section class="section" id="abonnements-section">
      <div class="container">
        <div class="section-head">
          <h2>Un abonnement pour toute la saison</h2>
          <p>Accès illimité aux remontées et tarifs préférentiels sur les cours.</p>
        </div>
        <div class="pricing-grid">
          <div class="plan">
            <div class="kind">Mensuel</div>
            <div class="price">89€<span class="per"> / mois</span></div>
            <ul><li>Accès à toutes les pistes</li><li>Tarif cours -10%</li><li>Sans engagement</li></ul>
            <a class="btn btn-ghost-dark" routerLink="/login" [queryParams]="{role:'skieur'}">Choisir</a>
          </div>
          <div class="plan featured">
            <div class="kind">Annuel</div>
            <div class="price">640€<span class="per"> / saison</span></div>
            <ul><li>Accès à toutes les pistes</li><li>Tarif cours -25%</li><li>Casier inclus</li><li>Invitations événements</li></ul>
            <a class="btn btn-amber" routerLink="/login" [queryParams]="{role:'skieur'}">Choisir</a>
          </div>
          <div class="plan">
            <div class="kind">Semestriel</div>
            <div class="price">395€<span class="per"> / 6 mois</span></div>
            <ul><li>Accès à toutes les pistes</li><li>Tarif cours -15%</li></ul>
            <a class="btn btn-ghost-dark" routerLink="/login" [queryParams]="{role:'skieur'}">Choisir</a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomePricingComponent {}
