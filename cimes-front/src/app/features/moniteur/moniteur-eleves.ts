import { Component, computed, inject } from '@angular/core';
import { niveauLabel } from '../../core/constants/labels';
import { CatalogService } from '../../core/services/catalog.service';
import { SessionService } from '../../core/services/session.service';

@Component({
  selector: 'app-moniteur-eleves',
  template: `
    <div class="dash-head"><div><h1>Élèves inscrits</h1><p>Par cours, pour la semaine en cours.</p></div></div>
    @for (c of mesCours(); track c.num) {
      <div class="panel" style="margin-bottom:20px;">
        <div class="panel-head">
          <h3>#{{ c.num }} — {{ niveauLabel(c.niveau) }} ({{ c.support === 'SKI' ? 'Ski' : 'Snowboard' }})</h3>
          <span class="status-pill" [class.status-active]="c.inscrits >= c.capacite" [class.status-pending]="c.inscrits < c.capacite">{{ c.inscrits }}/{{ c.capacite }}</span>
        </div>
        <div class="panel-body">
          <table>
            <thead><tr><th>Élève</th><th>Ville</th><th>Semaine</th></tr></thead>
            <tbody>
              @for (e of catalog.inscriptionsOfCours(c.num); track e.num || e.skieurNom) {
                <tr><td>{{ e.skieurNom }}</td><td>{{ e.skieurVille }}</td><td>Semaine {{ e.semaine }}</td></tr>
              } @empty {
                <tr><td colspan="3" class="muted">Aucun élève inscrit</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    } @empty {
      <p class="empty">Aucun cours assigné.</p>
    }
  `,
})
export class MoniteurElevesComponent {
  readonly catalog = inject(CatalogService);
  readonly session = inject(SessionService);
  readonly niveauLabel = niveauLabel;
  readonly mesCours = computed(() =>
    this.catalog.cours().filter((c) => c.moniteur === this.catalog.currentMoniteur(this.session.currentMoniteurId()).num),
  );
}
