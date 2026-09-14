import { Component, inject } from '@angular/core';
import { prettify } from '../../core/constants/labels';
import { CatalogService } from '../../core/services/catalog.service';
import { UiActionsService } from '../../core/services/ui-actions.service';

@Component({
  selector: 'app-admin-skieurs',
  templateUrl: './admin-skieurs.html',
})
export class AdminSkieursComponent {
  readonly catalog = inject(CatalogService);
  readonly actions = inject(UiActionsService);
  readonly prettify = prettify;
}
