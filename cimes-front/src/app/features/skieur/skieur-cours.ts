import { Component, inject } from '@angular/core';
import { CatalogService } from '../../core/services/catalog.service';
import { UiActionsService } from '../../core/services/ui-actions.service';
import { CoursCardComponent } from '../../shared/components/cours-card/cours-card';

@Component({
  selector: 'app-skieur-cours',
  imports: [CoursCardComponent],
  template: `
    <div class="dash-head">
      <div>
        <h1>Cours disponibles</h1>
        <p>Inscrivez-vous à un cours en précisant la semaine souhaitée.</p>
      </div>
    </div>
    <div class="cours-grid" style="border:1px solid var(--line);">
      @for (c of catalog.cours(); track c.num) {
        <app-cours-card [cours]="c" [showPlaces]="true">
          <div style="margin-top:14px;display:flex;justify-content:flex-end;">
            <button class="btn btn-sm" [class.btn-amber]="c.inscrits < c.capacite" [class.btn-ghost-dark]="c.inscrits >= c.capacite"
                    [disabled]="c.inscrits >= c.capacite" [style.opacity]="c.inscrits >= c.capacite ? .4 : 1"
                    (click)="actions.openInscrire(c.num)">
              {{ c.inscrits >= c.capacite ? 'Complet' : "S'inscrire" }}
            </button>
          </div>
        </app-cours-card>
      } @empty {
        <p class="empty" style="padding:20px 24px;">Aucun cours disponible.</p>
      }
    </div>
  `,
})
export class SkieurCoursComponent {
  readonly catalog = inject(CatalogService);
  readonly actions = inject(UiActionsService);
}
