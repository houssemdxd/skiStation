import { Component, computed, inject } from '@angular/core';
import { computeStatut, formatFrDate, FORMULES, prettify } from '../../core/constants/labels';
import { TypeAbonnement } from '../../core/models/api.models';
import { CatalogService } from '../../core/services/catalog.service';
import { SessionService } from '../../core/services/session.service';
import { UiActionsService } from '../../core/services/ui-actions.service';

@Component({
  selector: 'app-skieur-abonnement',
  template: `
    <div class="dash-head"><div><h1>Mon abonnement</h1><p>Gérez votre formule et vos options.</p></div></div>
    <div class="panel" style="max-width:520px;">
      <div class="panel-head">
        <h3>Formule actuelle</h3>
        @if (skieur().abonnement; as ab) {
          <span class="status-pill" [class.status-active]="statut(ab.fin)==='active'" [class.status-closed]="statut(ab.fin)!=='active'">
            {{ statut(ab.fin)==='active' ? 'Actif' : 'Terminé' }}
          </span>
        }
      </div>
      <div class="panel-body">
        @if (skieur().abonnement; as ab) {
          <div class="info-row"><span class="l">Type</span><span class="v">{{ prettify(ab.type) }}</span></div>
          <div class="info-row"><span class="l">Début</span><span class="v">{{ fmt(ab.debut) }}</span></div>
          <div class="info-row"><span class="l">Fin</span><span class="v">{{ fmt(ab.fin) }}</span></div>
          <div class="info-row"><span class="l">Prix payé</span><span class="v">{{ ab.prix }}€</span></div>
        } @else {
          <p class="empty">Aucun abonnement enregistré.</p>
        }
      </div>
    </div>
    <div class="section-title" style="font-size:17px;">Changer de formule</div>
    <div class="mini-grid">
      @for (f of formules; track f.type) {
        <div class="mini-card">
          <div class="top"><h4>{{ f.label }}</h4><span style="font-family:var(--serif);">{{ f.prix }}€</span></div>
          <div class="meta">{{ f.months === 1 ? 'Sans engagement' : f.months + ' mois' }}</div>
          <div class="foot">
            <button class="btn btn-ghost-dark btn-sm" type="button" [disabled]="skieur().abonnement?.type === f.type" (click)="change(f.type)">
              {{ skieur().abonnement?.type === f.type ? 'Formule actuelle' : 'Choisir' }}
            </button>
          </div>
        </div>
      }
    </div>
  `,
})
export class SkieurAbonnementComponent {
  readonly catalog = inject(CatalogService);
  readonly session = inject(SessionService);
  private readonly actions = inject(UiActionsService);
  readonly prettify = prettify;
  readonly fmt = formatFrDate;
  readonly statut = computeStatut;
  readonly formules = FORMULES;
  readonly skieur = computed(() => this.catalog.currentSkieur(this.session.currentSkieurId()));

  change(type: TypeAbonnement): void {
    void this.actions.changeFormule(this.skieur(), type);
  }
}
