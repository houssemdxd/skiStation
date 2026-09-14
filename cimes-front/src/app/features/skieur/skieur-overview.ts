import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { computeStatut, formatFrDate, niveauLabel, prettify } from '../../core/constants/labels';
import { CatalogService } from '../../core/services/catalog.service';
import { SessionService } from '../../core/services/session.service';

@Component({
  selector: 'app-skieur-overview',
  imports: [RouterLink],
  template: `
    <div class="dash-head">
      <div>
        <h1>Bonjour {{ skieur().prenom }}</h1>
        <p>{{ nextLine() }}</p>
      </div>
      <div class="dash-date">
        {{ skieur().ville || '' }} · abonnement {{ skieur().abonnement ? skieur().abonnement!.type.toLowerCase() : 'aucun' }}
      </div>
    </div>
    <div class="kpi-row">
      <div class="kpi">
        <div class="l">Abonnement</div>
        <div class="n">{{ skieur().abonnement ? prettify(skieur().abonnement!.type) : '—' }}</div>
        <div class="d">{{ skieur().abonnement ? "Valide jusqu'au " + fmt(skieur().abonnement!.fin) : '' }}</div>
      </div>
      <div class="kpi"><div class="l">Cours inscrits</div><div class="n">{{ skieur().inscriptions.length }}</div><div class="d">Cette saison</div></div>
      <div class="kpi"><div class="l">Pistes favorites</div><div class="n">{{ skieur().pistesFavorites.length }}</div><div class="d">Sur {{ catalog.pistes().length }} au total</div></div>
      <div class="kpi">
        <div class="l">Prochain cours</div>
        <div class="n">{{ prochaine() ? 'Sem. ' + prochaine()!.semaine : '—' }}</div>
        <div class="d">{{ nextCreneau() }}</div>
      </div>
    </div>
    <div class="panel-grid">
      <div class="panel">
        <div class="panel-head"><h3>Mes inscriptions</h3><a routerLink="../cours">Voir les cours</a></div>
        <div class="panel-body">
          <table>
            <thead><tr><th>Semaine</th><th>Cours</th><th>Moniteur</th><th>Créneau</th><th>Prix</th></tr></thead>
            <tbody>
              @for (i of skieur().inscriptions; track $index) {
                <tr>
                  <td>Semaine {{ i.semaine }}</td>
                  <td>{{ niveauLabel(catalog.coursByNum(i.coursNum).niveau) }} · {{ catalog.coursByNum(i.coursNum).support === 'SKI' ? 'Ski' : 'Snowboard' }}</td>
                  <td>{{ catalog.moniteurByNum(catalog.coursByNum(i.coursNum).moniteur).prenom }} {{ catalog.moniteurByNum(catalog.coursByNum(i.coursNum).moniteur).nom }}</td>
                  <td>{{ catalog.coursByNum(i.coursNum).creneau === 1 ? 'Matin' : 'Après-midi' }}</td>
                  <td>{{ catalog.coursByNum(i.coursNum).prix }}€</td>
                </tr>
              } @empty {
                <tr><td colspan="5" class="muted">Aucune inscription</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
      <div class="panel">
        <div class="panel-head"><h3>Mon abonnement</h3></div>
        <div class="panel-body">
          @if (skieur().abonnement; as ab) {
            <div class="info-row"><span class="l">Type</span><span class="v">{{ prettify(ab.type) }}</span></div>
            <div class="info-row"><span class="l">Début</span><span class="v">{{ fmt(ab.debut) }}</span></div>
            <div class="info-row"><span class="l">Fin</span><span class="v">{{ fmt(ab.fin) }}</span></div>
            <div class="info-row"><span class="l">Prix</span><span class="v">{{ ab.prix }}€</span></div>
            <div class="info-row"><span class="l">Statut</span><span class="v"><span class="status-pill" [class.status-active]="statut(ab.fin)==='active'" [class.status-closed]="statut(ab.fin)!=='active'">{{ statut(ab.fin)==='active' ? 'Actif' : 'Terminé' }}</span></span></div>
          } @else {
            <p class="empty">Aucun abonnement enregistré.</p>
          }
        </div>
      </div>
    </div>
  `,
})
export class SkieurOverviewComponent {
  readonly catalog = inject(CatalogService);
  readonly session = inject(SessionService);
  readonly prettify = prettify;
  readonly fmt = formatFrDate;
  readonly statut = computeStatut;
  readonly niveauLabel = niveauLabel;

  readonly skieur = computed(() => this.catalog.currentSkieur(this.session.currentSkieurId()));
  readonly prochaine = computed(() => this.skieur().inscriptions[0] || null);

  nextLine(): string {
    const p = this.prochaine();
    if (!p) return "Vous n'avez pas encore d'inscription.";
    const c = this.catalog.coursByNum(p.coursNum);
    const m = this.catalog.moniteurByNum(c.moniteur);
    return `Votre prochain cours est en semaine ${p.semaine}, avec ${m.prenom} ${m.nom}.`;
  }

  nextCreneau(): string {
    const p = this.prochaine();
    if (!p) return '';
    return this.catalog.coursByNum(p.coursNum).creneau === 1 ? 'Le matin' : "L'après-midi";
  }
}
