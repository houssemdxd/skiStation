import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { formatFrDate, niveauLabel } from '../../core/constants/labels';
import { CatalogService } from '../../core/services/catalog.service';
import { SessionService } from '../../core/services/session.service';

@Component({
  selector: 'app-moniteur-overview',
  imports: [RouterLink],
  template: `
    <div class="dash-head">
      <div>
        <h1>Bonjour {{ me().prenom }}</h1>
        <p>Vous encadrez {{ mesCours().length }} cours cette semaine, pour {{ totalEleves() }} élèves au total.</p>
      </div>
      <div class="dash-date">Moniteur depuis le {{ fmt(me().recrute) }}</div>
    </div>
    <div class="kpi-row">
      <div class="kpi"><div class="l">Cours cette semaine</div><div class="n">{{ mesCours().length }}</div><div class="d">Tous supports confondus</div></div>
      <div class="kpi"><div class="l">Élèves inscrits</div><div class="n">{{ totalEleves() }}</div><div class="d">Sur l'ensemble de vos cours</div></div>
      <div class="kpi"><div class="l">Ancienneté</div><div class="n">{{ anciennete() }} ans</div><div class="d">Dans la station</div></div>
      <div class="kpi"><div class="l">Taux de remplissage</div><div class="n">{{ remplissage() }}%</div><div class="d">Moyenne sur vos cours</div></div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Mon planning</h3><a routerLink="../planning">Tout voir</a></div>
      <div class="panel-body">
        <table>
          <thead><tr><th>Cours</th><th>Niveau</th><th>Support</th><th>Créneau</th><th>Élèves</th></tr></thead>
          <tbody>
            @for (c of mesCours(); track c.num) {
              <tr>
                <td>#{{ c.num }}</td>
                <td>{{ niveauLabel(c.niveau) }}</td>
                <td>{{ c.support === 'SKI' ? 'Ski' : 'Snowboard' }}</td>
                <td>{{ c.creneau === 1 ? 'Matin' : 'Après-midi' }}</td>
                <td>{{ c.inscrits }}/{{ c.capacite }}</td>
              </tr>
            } @empty {
              <tr><td colspan="5" class="muted">Aucun cours assigné</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class MoniteurOverviewComponent {
  readonly catalog = inject(CatalogService);
  readonly session = inject(SessionService);
  readonly fmt = formatFrDate;
  readonly niveauLabel = niveauLabel;

  readonly me = computed(() => this.catalog.currentMoniteur(this.session.currentMoniteurId()));
  readonly mesCours = computed(() => this.catalog.cours().filter((c) => c.moniteur === this.me().num));
  readonly totalEleves = computed(() => this.mesCours().reduce((s, c) => s + c.inscrits, 0));

  anciennete(): number {
    const d = this.me().recrute;
    return d ? new Date().getFullYear() - new Date(d).getFullYear() : 0;
  }

  remplissage(): number {
    const cap = this.mesCours().reduce((s, c) => s + c.capacite, 0) || 1;
    return Math.round((100 * this.totalEleves()) / cap);
  }
}
