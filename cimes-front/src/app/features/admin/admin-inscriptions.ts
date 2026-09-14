import { Component, inject } from '@angular/core';
import { CatalogService } from '../../core/services/catalog.service';
import { UiActionsService } from '../../core/services/ui-actions.service';

@Component({
  selector: 'app-admin-inscriptions',
  templateUrl: './admin-inscriptions.html',
})
export class AdminInscriptionsComponent {
  readonly catalog = inject(CatalogService);
  readonly actions = inject(UiActionsService);
}
