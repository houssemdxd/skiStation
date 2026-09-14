import { Component, computed, inject } from '@angular/core';
import { CatalogService } from '../../core/services/catalog.service';
import { SessionService } from '../../core/services/session.service';
import { CoursCardComponent } from '../../shared/components/cours-card/cours-card';

@Component({
  selector: 'app-moniteur-planning',
  imports: [CoursCardComponent],
  template: `
    <div class="dash-head">
      <div>
        <h1>Mon planning</h1>
        <p>Ensemble de vos cours pour la saison.</p>
      </div>
    </div>
    <div class="cours-grid" style="border:1px solid var(--line);">
      @for (c of mesCours(); track c.num) {
        <app-cours-card [cours]="c" [showPlaces]="true" priceHint="/ semaine / élève" />
      } @empty {
        <p class="empty" style="padding:20px 24px;">Aucun cours assigné.</p>
      }
    </div>
  `,
})
export class MoniteurPlanningComponent {
  readonly catalog = inject(CatalogService);
  readonly session = inject(SessionService);
  readonly mesCours = computed(() =>
    this.catalog
      .cours()
      .filter((cours) => cours.moniteur === this.catalog.currentMoniteur(this.session.currentMoniteurId()).num),
  );
}
