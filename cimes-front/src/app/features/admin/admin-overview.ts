import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { niveauLabel, prettify } from '../../core/constants/labels';
import { ApiService } from '../../core/services/api.service';
import { CatalogService } from '../../core/services/catalog.service';

@Component({
  selector: 'app-admin-overview',
  imports: [RouterLink],
  templateUrl: './admin-overview.html',
})
export class AdminOverviewComponent {
  readonly catalog = inject(CatalogService);
  private readonly api = inject(ApiService);
  readonly couleurs = signal<{ color: string; count: number }[]>([]);
  readonly prettify = prettify;
  readonly niveauLabel = niveauLabel;
  readonly eleves = computed(() => this.catalog.cours().reduce((sum, cours) => sum + cours.inscrits, 0));
  readonly capacite = computed(() => this.catalog.cours().reduce((sum, cours) => sum + cours.capacite, 0) || 1);
  readonly revenuTotal = computed(() =>
    Object.values(this.catalog.revenueByType()).reduce((sum, value) => sum + value, 0),
  );
  readonly revenueEntries = computed(() => Object.entries(this.catalog.revenueByType()));

  maxRevenue(): number {
    return Math.max(...this.revenueEntries().map(([, value]) => value), 1);
  }

  constructor() {
    void this.api.nombreParCouleurPiste().then((map) => {
      this.couleurs.set(Object.entries(map || {}).map(([color, count]) => ({ color, count: Number(count) })));
    }).catch(() => undefined);
  }
}
