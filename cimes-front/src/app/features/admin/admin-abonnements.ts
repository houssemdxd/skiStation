import { Component, computed, inject } from '@angular/core';
import { computeStatut, FORMULES, formatFrDate, prettify } from '../../core/constants/labels';
import { TypeAbonnement } from '../../core/models/api.models';
import { SkieurView } from '../../core/models/view.models';
import { CatalogService } from '../../core/services/catalog.service';
import { UiActionsService } from '../../core/services/ui-actions.service';

@Component({
  selector: 'app-admin-abonnements',
  templateUrl: './admin-abonnements.html',
})
export class AdminAbonnementsComponent {
  readonly catalog = inject(CatalogService);
  readonly actions = inject(UiActionsService);
  readonly prettify = prettify;
  readonly fmt = formatFrDate;
  readonly formules = FORMULES;

  readonly list = computed(() =>
    this.catalog.skieurs()
      .filter((skieur) => skieur.abonnement)
      .map((skieur) => ({
        skieur,
        nom: `${skieur.prenom} ${skieur.nom}`,
        type: skieur.abonnement!.type,
        debut: skieur.abonnement!.debut,
        fin: skieur.abonnement!.fin,
        prix: skieur.abonnement!.prix,
        statut: computeStatut(skieur.abonnement!.fin),
      })),
  );

  change(skieur: SkieurView, type: TypeAbonnement): void {
    void this.actions.changeFormule(skieur, type);
  }
}
