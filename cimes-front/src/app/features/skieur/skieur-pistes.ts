import { Component, computed, inject } from '@angular/core';
import { CatalogService } from '../../core/services/catalog.service';
import { SessionService } from '../../core/services/session.service';
import { UiActionsService } from '../../core/services/ui-actions.service';
import { IconComponent } from '../../shared/icons';

@Component({
  selector: 'app-skieur-pistes',
  imports: [IconComponent],
  template: `
    <div class="dash-head">
      <div><h1>Le domaine</h1><p>{{ catalog.pistes().length }} pistes ouvertes cette saison.</p></div>
    </div>
    <div class="piste-row head"><span></span><span>Piste</span><span>Difficulté</span><span>Longueur</span><span>Pente</span><span>Favorite</span></div>
    @for (p of catalog.pistes(); track p.num) {
      <div class="piste-row">
        <span>#{{ p.num < 10 ? '0' + p.num : p.num }}</span>
        <span class="piste-name">{{ p.nom }}</span>
        <span><span class="badge-color" [class]="'badge-' + p.color"></span>{{ p.color.charAt(0).toUpperCase() + p.color.slice(1) }}</span>
        <span>{{ p.km }} km</span>
        <span>{{ p.pente }}%</span>
        <span>
          <button class="icon-btn" [class.active]="fav(p.num)" (click)="actions.toggleFavorite(p.num)">
            <app-icon [name]="fav(p.num) ? 'star' : 'star-outline'" />
          </button>
        </span>
      </div>
    } @empty {
      <p class="empty">Aucune piste.</p>
    }
  `,
})
export class SkieurPistesComponent {
  readonly catalog = inject(CatalogService);
  readonly session = inject(SessionService);
  readonly actions = inject(UiActionsService);
  readonly skieur = computed(() => this.catalog.currentSkieur(this.session.currentSkieurId()));

  fav(num: number): boolean {
    return this.skieur().pistesFavorites.includes(num);
  }
}
