import { Injectable, inject, signal } from '@angular/core';
import {
  normalizeCours,
  normalizeInscription,
  normalizeMoniteur,
  normalizePiste,
  normalizeSkieur,
} from '../mappers/catalog.mapper';
import { ApiStatus } from '../models/api.models';
import {
  CoursView,
  EMPTY_COURS,
  EMPTY_MONITEUR,
  EMPTY_SKIEUR,
  InscriptionView,
  MoniteurView,
  PisteView,
  SkieurView,
} from '../models/view.models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly api = inject(ApiService);

  readonly status = signal<ApiStatus>('idle');
  readonly pistes = signal<PisteView[]>([]);
  readonly cours = signal<CoursView[]>([]);
  readonly moniteurs = signal<MoniteurView[]>([]);
  readonly skieurs = signal<SkieurView[]>([]);
  readonly inscriptions = signal<InscriptionView[]>([]);

  constructor() {
    void this.refresh();
  }

  coursByNum(num: number | null | undefined): CoursView {
    return this.cours().find((cours) => cours.num === num) || EMPTY_COURS;
  }

  moniteurByNum(num: number | null | undefined): MoniteurView {
    return this.moniteurs().find((moniteur) => moniteur.num === num) || EMPTY_MONITEUR;
  }

  currentSkieur(id: number): SkieurView {
    return this.skieurs().find((skieur) => skieur.num === id) || this.skieurs()[0] || EMPTY_SKIEUR;
  }

  currentMoniteur(id: number): MoniteurView {
    return this.moniteurs().find((moniteur) => moniteur.num === id) || this.moniteurs()[0] || EMPTY_MONITEUR;
  }

  inscriptionsOfCours(coursNum: number): InscriptionView[] {
    return this.inscriptions().filter((inscription) => inscription.coursNum === coursNum);
  }

  revenueByType(): Record<string, number> {
    const totals: Record<string, number> = {};
    this.skieurs().forEach((skieur) => {
      if (skieur.abonnement) {
        const type = skieur.abonnement.type || 'AUTRE';
        totals[type] = (totals[type] || 0) + (skieur.abonnement.prix || 0);
      }
    });
    return totals;
  }

  async refresh(): Promise<void> {
    this.status.set('loading');
    try {
      const [pistes, cours, moniteurs, skieurs, inscriptions] = await Promise.all([
        this.api.pistesAll(),
        this.api.coursAll(),
        this.api.moniteursAll(),
        this.api.skieursAll(),
        this.api.inscriptionsAll().catch(() => []),
      ]);
      const mappedSkieurs = (skieurs || []).map(normalizeSkieur);
      const mappedInscriptions = (inscriptions || []).map((item) => normalizeInscription(item));
      const allInscriptions = mappedInscriptions.length
        ? mappedInscriptions
        : mappedSkieurs.flatMap((skieur) => skieur.inscriptions);
      this.pistes.set((pistes || []).map(normalizePiste));
      this.cours.set(
        (cours || []).map((item) => {
          const mapped = normalizeCours(item);
          return {
            ...mapped,
            inscrits: allInscriptions.filter((inscription) => inscription.coursNum === mapped.num).length,
          };
        }),
      );
      this.moniteurs.set((moniteurs || []).map(normalizeMoniteur));
      this.skieurs.set(mappedSkieurs);
      this.inscriptions.set(allInscriptions);
      this.status.set('connected');
    } catch {
      this.pistes.set([]);
      this.cours.set([]);
      this.moniteurs.set([]);
      this.skieurs.set([]);
      this.inscriptions.set([]);
      this.status.set('offline');
    }
  }
}
