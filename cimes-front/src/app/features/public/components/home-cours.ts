import { Component, inject } from '@angular/core';
import { CatalogService } from '../../../core/services/catalog.service';
import { CoursCardComponent } from '../../../shared/components/cours-card/cours-card';

@Component({
  selector: 'app-home-cours',
  imports: [CoursCardComponent],
  template: `
    <section class="section home-cours" id="cours-section">
      <div class="container">
        <div class="section-head">
          <h2>Des cours pour chaque niveau</h2>
          <p>Collectifs ou particuliers, ski ou snowboard, créneau du matin ou de l'après-midi.</p>
        </div>
        <div class="cours-grid">
          @for (c of catalog.cours().slice(0, 6); track c.num) {
            <app-cours-card [cours]="c" />
          } @empty {
            <p class="empty" style="padding:20px 24px;">Aucun cours pour le moment.</p>
          }
        </div>
      </div>
    </section>
  `,
})
export class HomeCoursComponent {
  readonly catalog = inject(CatalogService);
}
