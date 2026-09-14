import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SUPPORT_OPTIONS, TYPE_ABONNEMENT_OPTIONS, TYPE_COURS_OPTIONS, formatFrDate, prettify } from '../../core/constants/labels';
import { Support, TypeAbonnement, TypeCours } from '../../core/models/api.models';
import { ApiService } from '../../core/services/api.service';
import { CatalogService } from '../../core/services/catalog.service';
import { ToastService } from '../../core/services/toast.service';
import { UiActionsService } from '../../core/services/ui-actions.service';

type QueryTab = 'skieurs' | 'abonnements' | 'planning' | 'cours' | 'pistes';

@Component({
  selector: 'app-admin-affectations',
  imports: [FormsModule],
  templateUrl: './admin-affectations.html',
})
export class AdminAffectationsComponent {
  readonly catalog = inject(CatalogService);
  readonly actions = inject(UiActionsService);
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  readonly prettify = prettify;
  readonly fmt = formatFrDate;
  readonly typeOptions = TYPE_ABONNEMENT_OPTIONS;
  readonly typeCoursOptions = TYPE_COURS_OPTIONS;
  readonly supportOptions = SUPPORT_OPTIONS;

  readonly tabs: { id: QueryTab; label: string }[] = [
    { id: 'skieurs', label: 'Skieurs' },
    { id: 'abonnements', label: 'Abonnements' },
    { id: 'planning', label: 'Planning' },
    { id: 'cours', label: 'Cours' },
    { id: 'pistes', label: 'Pistes' },
  ];

  readonly tab = signal<QueryTab>('skieurs');
  readonly loading = signal(false);
  readonly searched = signal(false);

  filterType: TypeAbonnement = 'ANNUEL';
  filterCoursType: TypeCours = 'COLLECTIF_ADULTE';
  filterCoursSupport: Support = 'SKI';
  coursMode: 'type' | 'support' = 'type';
  abonnementMode: 'type' | 'dates' = 'type';
  startDate = '';
  endDate = '';
  weekMoniteur = '';
  weekSupport: Support = 'SKI';

  readonly skieursByType = signal<{ num: number; nom: string; prenom: string; type: string }[]>([]);
  readonly abonnements = signal<{ type: string; debut: string; fin: string; prix: number }[]>([]);
  readonly weeks = signal<number[]>([]);
  readonly couleurs = signal<{ color: string; count: number }[]>([]);
  readonly coursFiltres = signal<{ num: number; type: string; support: string; prix: number }[]>([]);

  selectTab(id: QueryTab): void {
    this.tab.set(id);
    this.searched.set(false);
  }

  async runQuery(): Promise<void> {
    this.loading.set(true);
    try {
      switch (this.tab()) {
        case 'skieurs':
          await this.loadSkieursByType();
          break;
        case 'abonnements':
          if (this.abonnementMode === 'dates') await this.loadAbonnementsByDates();
          else await this.loadAbonnementsByType();
          break;
        case 'planning':
          await this.loadWeeks();
          break;
        case 'cours':
          if (this.coursMode === 'support') await this.loadCoursBySupport();
          else await this.loadCoursByType();
          break;
        case 'pistes':
          await this.loadCouleurs();
          break;
      }
      this.searched.set(true);
    } finally {
      this.loading.set(false);
    }
  }

  colorClass(color: string): string {
    const raw = color.toLowerCase();
    if (raw.startsWith('vert')) return 'badge-verte';
    if (raw.startsWith('bleu')) return 'badge-bleue';
    if (raw.startsWith('roug')) return 'badge-rouge';
    return 'badge-noire';
  }

  private async loadSkieursByType(): Promise<void> {
    try {
      const list = await this.api.skieursByTypeAbonnement(this.filterType);
      this.skieursByType.set(
        (list || []).map((skieur) => ({
          num: skieur.numSkieur,
          nom: skieur.nomS,
          prenom: skieur.prenomS,
          type: skieur.abonnement?.typeAbonnement || this.filterType,
        })),
      );
    } catch (e: unknown) {
      this.toast.show('Erreur : ' + (e instanceof Error ? e.message : String(e)));
    }
  }

  private async loadAbonnementsByType(): Promise<void> {
    try {
      const list = await this.api.abonnementsByType(this.filterType);
      this.abonnements.set(this.mapAbonnements(list || []));
    } catch (e: unknown) {
      this.toast.show('Erreur : ' + (e instanceof Error ? e.message : String(e)));
    }
  }

  private async loadAbonnementsByDates(): Promise<void> {
    if (!this.startDate || !this.endDate) {
      this.toast.show('Choisissez une date de début et de fin');
      return;
    }
    try {
      const list = await this.api.abonnementsByDates(this.startDate, this.endDate);
      this.abonnements.set(this.mapAbonnements(list || []));
    } catch (e: unknown) {
      this.toast.show('Erreur : ' + (e instanceof Error ? e.message : String(e)));
    }
  }

  private async loadWeeks(): Promise<void> {
    if (!this.weekMoniteur) {
      this.toast.show('Choisissez un moniteur');
      return;
    }
    try {
      const weeks = await this.api.moniteurWeeks(Number(this.weekMoniteur), this.weekSupport);
      this.weeks.set(weeks || []);
    } catch (e: unknown) {
      this.toast.show('Erreur : ' + (e instanceof Error ? e.message : String(e)));
    }
  }

  private async loadCoursByType(): Promise<void> {
    try {
      const list = await this.api.coursByType(this.filterCoursType);
      this.coursFiltres.set(this.mapCours(list || []));
    } catch (e: unknown) {
      this.toast.show('Erreur : ' + (e instanceof Error ? e.message : String(e)));
    }
  }

  private async loadCoursBySupport(): Promise<void> {
    try {
      const list = await this.api.coursBySupport(this.filterCoursSupport);
      this.coursFiltres.set(this.mapCours(list || []));
    } catch (e: unknown) {
      this.toast.show('Erreur : ' + (e instanceof Error ? e.message : String(e)));
    }
  }

  private async loadCouleurs(): Promise<void> {
    try {
      const map = await this.api.nombreParCouleurPiste();
      this.couleurs.set(
        Object.entries(map || {}).map(([color, count]) => ({ color, count: Number(count) })),
      );
    } catch (e: unknown) {
      this.toast.show('Erreur : ' + (e instanceof Error ? e.message : String(e)));
    }
  }

  private mapCours(list: { numCours?: number; typeCours?: string; support?: string; prix?: number }[]) {
    return list.map((cours) => ({
      num: cours.numCours || 0,
      type: cours.typeCours || '',
      support: cours.support || '',
      prix: cours.prix || 0,
    }));
  }

  private mapAbonnements(list: { typeAbonnement?: string; datedebut?: string; dateFin?: string; prixAbon?: number }[]) {
    return list.map((abonnement) => ({
      type: abonnement.typeAbonnement || '',
      debut: abonnement.datedebut || '',
      fin: abonnement.dateFin || '',
      prix: abonnement.prixAbon || 0,
    }));
  }
}
