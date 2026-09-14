import { Component, inject } from '@angular/core';
import { formatFrDate } from '../../core/constants/labels';
import { CatalogService } from '../../core/services/catalog.service';
import { UiActionsService } from '../../core/services/ui-actions.service';

@Component({
  selector: 'app-admin-moniteurs',
  templateUrl: './admin-moniteurs.html',
})
export class AdminMoniteursComponent {
  readonly catalog = inject(CatalogService);
  readonly actions = inject(UiActionsService);
  readonly fmt = formatFrDate;
}
