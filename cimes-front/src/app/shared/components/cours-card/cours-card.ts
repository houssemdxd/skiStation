import { Component, Input, inject } from '@angular/core';
import { niveauLabel } from '../../../core/constants/labels';
import { CoursView } from '../../../core/models/view.models';
import { CatalogService } from '../../../core/services/catalog.service';

@Component({
  selector: 'app-cours-card',
  template: `
    <article class="cours-card">
      <div class="cours-type">{{ cours.typeLabel }} · {{ cours.support === 'SKI' ? 'Ski' : 'Snowboard' }}</div>
      <h4>{{ niveauLabel(cours.niveau) }}</h4>
      <div class="cours-meta">
        <span class="tag">{{ cours.creneau === 1 ? 'Matin' : 'Après-midi' }}</span>
        <span class="tag">{{ moniteurLabel }}</span>
        @if (showPlaces) {
          <span class="tag">{{ cours.inscrits }}/{{ cours.capacite }} élèves</span>
        }
      </div>
      <div class="cours-price">{{ cours.prix }}€ <span>{{ priceHint }}</span></div>
      <ng-content />
    </article>
  `,
})
export class CoursCardComponent {
  private readonly catalog = inject(CatalogService);
  readonly niveauLabel = niveauLabel;

  @Input({ required: true }) cours!: CoursView;
  @Input() showPlaces = false;
  @Input() priceHint = '/ semaine';

  get moniteurLabel(): string {
    if (!this.cours.moniteur) return 'Sans moniteur';
    const m = this.catalog.moniteurByNum(this.cours.moniteur);
    return `${m.prenom} ${m.nom}`.trim() || 'Sans moniteur';
  }
}
