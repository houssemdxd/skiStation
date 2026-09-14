import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { niveauLabel, SUPPORT_OPTIONS, TYPE_COURS_OPTIONS } from '../../core/constants/labels';
import { CatalogService } from '../../core/services/catalog.service';
import { UiActionsService } from '../../core/services/ui-actions.service';

@Component({
  selector: 'app-admin-cours',
  imports: [FormsModule],
  templateUrl: './admin-cours.html',
})
export class AdminCoursComponent {
  readonly catalog = inject(CatalogService);
  readonly actions = inject(UiActionsService);
  readonly niveauLabel = niveauLabel;
  readonly typeOptions = TYPE_COURS_OPTIONS;
  readonly supportOptions = SUPPORT_OPTIONS;

  filterType = signal('');
  filterSupport = signal('');

  readonly filtered = computed(() =>
    this.catalog.cours().filter((cours) => {
      const type = this.filterType();
      const support = this.filterSupport();
      return (!type || cours.typeCours === type) && (!support || cours.support === support);
    }),
  );
}
