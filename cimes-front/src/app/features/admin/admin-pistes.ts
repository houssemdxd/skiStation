import { Component, inject } from '@angular/core';
import { CatalogService } from '../../core/services/catalog.service';
import { UiActionsService } from '../../core/services/ui-actions.service';
import { ColorBadgeComponent } from '../../shared/components/color-badge/color-badge';

@Component({
  selector: 'app-admin-pistes',
  imports: [ColorBadgeComponent],
  templateUrl: './admin-pistes.html',
})
export class AdminPistesComponent {
  readonly catalog = inject(CatalogService);
  readonly actions = inject(UiActionsService);
}
