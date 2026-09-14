import { Component, inject } from '@angular/core';
import { CatalogService } from '../../../core/services/catalog.service';
import { ColorBadgeComponent } from '../../../shared/components/color-badge/color-badge';

@Component({
  selector: 'app-home-pistes',
  imports: [ColorBadgeComponent],
  template: `
    <section class="section" id="pistes-section">
      <div class="container">
        <div class="section-head">
          <h2>Le domaine, piste par piste</h2>
          <p>Chaque piste est classée selon le système français : verte, bleue, rouge, noire — de la plus douce à la plus technique.</p>
        </div>
        <div class="piste-row head">
          <span></span><span>Piste</span><span>Difficulté</span><span>Longueur</span><span>Pente</span><span></span>
        </div>
        @for (p of catalog.pistes(); track p.num) {
          <div class="piste-row">
            <span>#{{ p.num < 10 ? '0' + p.num : p.num }}</span>
            <span class="piste-name">{{ p.nom }}</span>
            <span><app-color-badge [color]="p.color" /></span>
            <span>{{ p.km }} km</span>
            <span>{{ p.pente }}%</span>
            <span></span>
          </div>
        } @empty {
          <p class="empty">Aucune piste pour le moment.</p>
        }
      </div>
    </section>
  `,
})
export class HomePistesComponent {
  readonly catalog = inject(CatalogService);
}
