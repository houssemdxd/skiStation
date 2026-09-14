import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../../../core/services/catalog.service';
import { SnowfallComponent } from '../../../shared/components/snowfall/snowfall';
import { MountainSceneComponent } from '../../../shared/icons';

@Component({
  selector: 'app-home-hero',
  imports: [RouterLink, SnowfallComponent, MountainSceneComponent],
  template: `
    <section class="hero">
      <app-snowfall />
      <div class="container hero-grid">
        <div>
          <div class="hero-eyebrow">Saison 2026 / 2027 — ouverture le 5 décembre</div>
          <h1>Apprenez à glisser sur les plus belles pentes des Alpes.</h1>
          <p class="lead">
            Cours particuliers et collectifs, moniteurs diplômés d'état, et un domaine de
            {{ catalog.pistes().length }} pistes réparties du sentier des débutants aux couloirs les plus techniques.
          </p>
          <div class="hero-actions">
            <a class="btn btn-amber" routerLink="/login" [queryParams]="{role:'skieur'}">Réserver un cours</a>
            <a class="btn btn-ghost-light" href="#pistes-section">Voir le domaine</a>
          </div>
        </div>
        <div class="hero-mountain"><app-mountain-scene /></div>
      </div>
      <div class="hero-stats">
        <div class="container">
          <div class="stat"><div class="n">{{ catalog.pistes().length }}</div><div class="l">Pistes ouvertes</div></div>
          <div class="stat"><div class="n">{{ totalKm }} km</div><div class="l">De domaine skiable</div></div>
          <div class="stat"><div class="n">{{ catalog.moniteurs().length }}</div><div class="l">Moniteurs diplômés</div></div>
          <div class="stat"><div class="n">{{ maxPente }}%</div><div class="l">Pente maximale</div></div>
        </div>
      </div>
    </section>
  `,
})
export class HomeHeroComponent {
  readonly catalog = inject(CatalogService);

  get totalKm(): string {
    return this.catalog.pistes().reduce((sum, piste) => sum + piste.km, 0).toFixed(1);
  }

  get maxPente(): number {
    const pistes = this.catalog.pistes();
    return pistes.length ? Math.max(...pistes.map((piste) => piste.pente)) : 0;
  }
}
