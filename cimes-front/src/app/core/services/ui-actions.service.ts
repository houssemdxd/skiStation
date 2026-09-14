import { Injectable, inject } from '@angular/core';
import { Color, Support, TypeAbonnement, TypeCours } from '../models/api.models';
import { FORMULES, TYPE_ABONNEMENT_OPTIONS } from '../constants/labels';
import { SkieurView } from '../models/view.models';
import { ApiService } from './api.service';
import { CatalogService } from './catalog.service';
import { ModalService } from './modal.service';
import { SessionService } from './session.service';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class UiActionsService {
  private readonly api = inject(ApiService);
  private readonly catalog = inject(CatalogService);
  private readonly modal = inject(ModalService);
  private readonly toast = inject(ToastService);
  private readonly session = inject(SessionService);

  openAddPiste(): void {
    this.modal.open({
      title: 'Nouvelle piste',
      submitLabel: 'Créer la piste',
      fields: [
        { key: 'nomPiste', label: 'Nom de la piste', placeholder: 'La Verte' },
        { key: 'color', label: 'Difficulté', type: 'select', value: 'VERT', options: [
          { value: 'VERT', label: 'Verte' }, { value: 'BLEU', label: 'Bleue' },
          { value: 'ROUGE', label: 'Rouge' }, { value: 'NOIR', label: 'Noire' },
        ]},
        { key: 'Longeur', label: 'Longueur (km)', type: 'number', placeholder: '2.5' },
        { key: 'pente', label: 'Pente (%)', type: 'number', placeholder: '15' },
      ],
      onSubmit: async (v) => {
        await this.api.addPiste({
          nomPiste: v['nomPiste'],
          color: v['color'] as Color,
          Longeur: parseFloat(v['Longeur']) || 0,
          pente: parseInt(v['pente'], 10) || 0,
        });
        this.modal.close();
        this.toast.show('Piste créée');
        await this.catalog.refresh();
      },
    });
  }

  async deletePiste(num: number): Promise<void> {
    if (!confirm('Supprimer cette piste ?')) return;
    try {
      await this.api.deletePiste(num);
      this.toast.show('Piste supprimée');
      await this.catalog.refresh();
    } catch (e: unknown) {
      this.toast.show('Erreur : ' + (e instanceof Error ? e.message : String(e)));
    }
  }

  openAddCours(): void {
    const monOptions = this.catalog.moniteurs().map((m) => ({
      value: String(m.num),
      label: `#${m.num} ${m.prenom} ${m.nom}`,
    }));
    this.modal.open({
      title: 'Nouveau cours',
      submitLabel: 'Créer le cours',
      fields: [
        { key: 'niveau', label: 'Niveau (1 à 4)', type: 'number', value: 1 },
        { key: 'typeCours', label: 'Type', type: 'select', value: 'COLLECTIF_ADULTE', options: [
          { value: 'COLLECTIF_ADULTE', label: 'Collectif adulte' },
          { value: 'COLLECTIF_ENFANT', label: 'Collectif enfant' },
          { value: 'PARTICULEIR', label: 'Particulier' },
        ]},
        { key: 'support', label: 'Support', type: 'select', value: 'SKI', options: [
          { value: 'SKI', label: 'Ski' }, { value: 'SNOWBOARD', label: 'Snowboard' },
        ]},
        { key: 'creanau', label: 'Créneau', type: 'select', value: '1', options: [
          { value: '1', label: 'Matin' }, { value: '2', label: "Après-midi" },
        ]},
        { key: 'prix', label: 'Prix (€)', type: 'number', placeholder: '55' },
        { key: 'moniteur', label: 'Moniteur (optionnel)', type: 'select', value: '', options: [
          { value: '', label: '— Aucun —' }, ...monOptions,
        ]},
      ],
      onSubmit: async (v) => {
        const body = {
          niveau: parseInt(v['niveau'], 10) || 1,
          typeCours: v['typeCours'] as TypeCours,
          support: v['support'] as Support,
          creanau: parseInt(v['creanau'], 10) || 1,
          prix: parseFloat(v['prix']) || 0,
          ...(v['moniteur'] ? { moniteur: { numMoniteur: parseInt(v['moniteur'], 10) } } : {}),
        };
        await this.api.addCours(body);
        this.modal.close();
        this.toast.show('Cours créé');
        await this.catalog.refresh();
      },
    });
  }

  openAddMoniteur(): void {
    this.modal.open({
      title: 'Nouveau moniteur',
      submitLabel: 'Créer le moniteur',
      fields: [
        { key: 'nomM', label: 'Nom', placeholder: 'Dupont' },
        { key: 'prenomM', label: 'Prénom', placeholder: 'Jean' },
        { key: 'dateRecus', label: 'Date de recrutement', type: 'date' },
      ],
      onSubmit: async (v) => {
        await this.api.addMoniteur({ nomM: v['nomM'], prenomM: v['prenomM'], dateRecus: v['dateRecus'] });
        this.modal.close();
        this.toast.show('Moniteur ajouté');
        await this.catalog.refresh();
      },
    });
  }

  async bestMoniteur(): Promise<void> {
    try {
      await this.api.bestMoniteur();
      this.toast.show('Meilleur moniteur mis à jour (prime attribuée)');
      await this.catalog.refresh();
    } catch (e: unknown) {
      this.toast.show('Erreur : ' + (e instanceof Error ? e.message : String(e)));
    }
  }

  async deleteCours(num: number): Promise<void> {
    if (!confirm('Supprimer ce cours et ses inscriptions ?')) return;
    try {
      await this.api.deleteCours(num);
      this.toast.show('Cours supprimé');
      await this.catalog.refresh();
    } catch (e: unknown) {
      this.toast.show('Erreur : ' + (e instanceof Error ? e.message : String(e)));
    }
  }

  async deleteMoniteur(num: number): Promise<void> {
    if (!confirm('Supprimer ce moniteur ? Ses cours resteront sans moniteur.')) return;
    try {
      await this.api.deleteMoniteur(num);
      this.toast.show('Moniteur supprimé');
      await this.catalog.refresh();
    } catch (e: unknown) {
      this.toast.show('Erreur : ' + (e instanceof Error ? e.message : String(e)));
    }
  }

  async deleteInscription(num: number): Promise<void> {
    if (!confirm('Annuler cette inscription ?')) return;
    try {
      await this.api.deleteInscription(num);
      this.toast.show('Inscription annulée');
      await this.catalog.refresh();
    } catch (e: unknown) {
      this.toast.show('Erreur : ' + (e instanceof Error ? e.message : String(e)));
    }
  }

  openEditSkieur(skieur: SkieurView): void {
    this.modal.open({
      title: 'Modifier le skieur',
      submitLabel: 'Enregistrer',
      fields: [
        { key: 'nomS', label: 'Nom', value: skieur.nom },
        { key: 'prenomS', label: 'Prénom', value: skieur.prenom },
        { key: 'dateNaissance', label: 'Date de naissance', type: 'date', value: skieur.naissance },
        { key: 'ville', label: 'Ville', value: skieur.ville },
      ],
      onSubmit: async (v) => {
        await this.api.updateSkieur({
          numSkieur: skieur.num,
          nomS: v['nomS'],
          prenomS: v['prenomS'],
          dateNaissance: v['dateNaissance'],
          ville: v['ville'],
          ...(skieur.abonnement
            ? {
                abonnement: {
                  id: skieur.abonnement.id ?? undefined,
                  datedebut: skieur.abonnement.debut,
                  dateFin: skieur.abonnement.fin,
                  prixAbon: skieur.abonnement.prix,
                  typeAbonnement: skieur.abonnement.type as TypeAbonnement,
                },
              }
            : {}),
        });
        this.modal.close();
        this.toast.show('Skieur mis à jour');
        await this.catalog.refresh();
      },
    });
  }

  async changeFormule(skieur: SkieurView, type: TypeAbonnement): Promise<void> {
    const formule = FORMULES.find((item) => item.type === type);
    if (!formule) return;
    if (!skieur.abonnement?.id) {
      this.toast.show('Aucun abonnement à mettre à jour pour ce skieur');
      return;
    }
    const debut = new Date();
    const fin = new Date(debut);
    fin.setMonth(fin.getMonth() + formule.months);
    try {
      await this.api.updateAbonnement({
        id: skieur.abonnement.id,
        datedebut: debut.toISOString().slice(0, 10),
        dateFin: fin.toISOString().slice(0, 10),
        prixAbon: formule.prix,
        typeAbonnement: formule.type,
      });
      this.toast.show(`Formule passée en ${formule.label.toLowerCase()}`);
      await this.catalog.refresh();
    } catch (e: unknown) {
      this.toast.show('Erreur : ' + (e instanceof Error ? e.message : String(e)));
    }
  }

  async deleteSkieur(num: number): Promise<void> {
    if (!confirm('Supprimer ce skieur ?')) return;
    try {
      await this.api.deleteSkieur(num);
      this.toast.show('Skieur supprimé');
      await this.catalog.refresh();
    } catch (e: unknown) {
      this.toast.show('Erreur : ' + (e instanceof Error ? e.message : String(e)));
    }
  }

  openInscrire(coursNum: number): void {
    this.modal.open({
      title: "S'inscrire au cours",
      submitLabel: "Confirmer l'inscription",
      fields: [{ key: 'numSemaine', label: 'Semaine (1 à 52)', type: 'number', placeholder: '12' }],
      onSubmit: async (v) => {
        const skieurId = this.session.currentSkieurId();
        await this.api.addInscription(skieurId, coursNum, parseInt(v['numSemaine'], 10) || 1);
        this.modal.close();
        this.toast.show('Inscription confirmée');
        await this.catalog.refresh();
      },
    });
  }

  async toggleFavorite(pisteNum: number): Promise<void> {
    try {
      await this.api.assignSkieurToPiste(this.session.currentSkieurId(), pisteNum);
      this.toast.show('Piste ajoutée aux favorites');
      await this.catalog.refresh();
    } catch (e: unknown) {
      this.toast.show('Erreur : ' + (e instanceof Error ? e.message : String(e)));
    }
  }

  openAddSkieur(): void {
    this.modal.open({
      title: 'Nouveau skieur',
      submitLabel: 'Créer le skieur',
      fields: [
        { key: 'nomS', label: 'Nom', placeholder: 'Martin' },
        { key: 'prenomS', label: 'Prénom', placeholder: 'Alice' },
        { key: 'dateNaissance', label: 'Date de naissance', type: 'date' },
        { key: 'ville', label: 'Ville', placeholder: 'Grenoble' },
        { key: 'typeAbonnement', label: 'Abonnement', type: 'select', value: 'ANNUEL', options: TYPE_ABONNEMENT_OPTIONS },
        { key: 'datedebut', label: 'Début', type: 'date' },
        { key: 'dateFin', label: 'Fin', type: 'date' },
        { key: 'prixAbon', label: 'Prix (€)', type: 'number', placeholder: '450' },
      ],
      onSubmit: async (v) => {
        await this.api.addSkieur(this.skieurPayload(v));
        this.modal.close();
        this.toast.show('Skieur et abonnement créés');
        await this.catalog.refresh();
      },
    });
  }

  openAssignSkieurToPiste(): void {
    this.modal.open({
      title: 'Affecter un skieur à une piste',
      submitLabel: 'Affecter',
      fields: [
        { key: 'skieur', label: 'Skieur', type: 'select', options: this.skieurOptions() },
        { key: 'piste', label: 'Piste', type: 'select', options: this.pisteOptions() },
      ],
      onSubmit: async (v) => {
        await this.api.assignSkieurToPiste(Number(v['skieur']), Number(v['piste']));
        this.modal.close();
        this.toast.show('Skieur affecté à la piste');
        await this.catalog.refresh();
      },
    });
  }

  openAddSkieurAndAssignToCours(): void {
    this.modal.open({
      title: 'Créer un skieur et l’inscrire à un cours',
      submitLabel: 'Créer et inscrire',
      fields: [
        { key: 'nomS', label: 'Nom', placeholder: 'Martin' },
        { key: 'prenomS', label: 'Prénom', placeholder: 'Alice' },
        { key: 'dateNaissance', label: 'Date de naissance', type: 'date' },
        { key: 'ville', label: 'Ville', placeholder: 'Grenoble' },
        { key: 'typeAbonnement', label: 'Abonnement', type: 'select', value: 'ANNUEL', options: TYPE_ABONNEMENT_OPTIONS },
        { key: 'datedebut', label: 'Début', type: 'date' },
        { key: 'dateFin', label: 'Fin', type: 'date' },
        { key: 'prixAbon', label: 'Prix (€)', type: 'number', placeholder: '450' },
        { key: 'cours', label: 'Cours', type: 'select', options: this.coursOptions() },
      ],
      onSubmit: async (v) => {
        await this.api.addSkieurAndAssignToCours(Number(v['cours']), this.skieurPayload(v));
        this.modal.close();
        this.toast.show('Skieur créé et inscrit au cours');
        await this.catalog.refresh();
      },
    });
  }

  openAddMoniteurAndAssignToCours(): void {
    this.modal.open({
      title: 'Créer un moniteur et l’affecter à un cours',
      submitLabel: 'Créer et affecter',
      fields: [
        { key: 'nomM', label: 'Nom', placeholder: 'Dupont' },
        { key: 'prenomM', label: 'Prénom', placeholder: 'Jean' },
        { key: 'dateRecus', label: 'Date de recrutement', type: 'date' },
        { key: 'cours', label: 'Cours', type: 'select', options: this.coursOptions() },
      ],
      onSubmit: async (v) => {
        await this.api.addMoniteurAndAssignToCours(Number(v['cours']), {
          nomM: v['nomM'],
          prenomM: v['prenomM'],
          dateRecus: v['dateRecus'],
        });
        this.modal.close();
        this.toast.show('Moniteur créé et affecté au cours');
        await this.catalog.refresh();
      },
    });
  }

  openInscrireSkieurToCours(): void {
    this.modal.open({
      title: 'Inscrire un skieur à un cours',
      submitLabel: 'Inscrire',
      fields: [
        { key: 'skieur', label: 'Skieur', type: 'select', options: this.skieurOptions() },
        { key: 'cours', label: 'Cours', type: 'select', options: this.coursOptions() },
        { key: 'numSemaine', label: 'Semaine (1 à 52)', type: 'number', placeholder: '12' },
      ],
      onSubmit: async (v) => {
        await this.api.addInscription(Number(v['skieur']), Number(v['cours']), parseInt(v['numSemaine'], 10) || 1);
        this.modal.close();
        this.toast.show('Inscription enregistrée');
        await this.catalog.refresh();
      },
    });
  }

  openAssignInscriptionToCours(inscriptionId?: number): void {
    this.modal.open({
      title: 'Réaffecter une inscription à un cours',
      submitLabel: 'Réaffecter',
      fields: [
        {
          key: 'inscription',
          label: 'Inscription',
          type: 'select',
          value: inscriptionId ? String(inscriptionId) : '',
          options: this.inscriptionOptions(),
        },
        { key: 'cours', label: 'Nouveau cours', type: 'select', options: this.coursOptions() },
      ],
      onSubmit: async (v) => {
        await this.api.assignInscriptionToCours(Number(v['inscription']), Number(v['cours']));
        this.modal.close();
        this.toast.show('Inscription réaffectée');
        await this.catalog.refresh();
      },
    });
  }

  openAssignMoniteurToCours(coursNum?: number): void {
    const cours = this.catalog.cours().find((item) => item.num === coursNum);
    this.modal.open({
      title: 'Affecter un moniteur au cours',
      submitLabel: 'Mettre à jour',
      fields: [
        {
          key: 'cours',
          label: 'Cours',
          type: 'select',
          value: coursNum ? String(coursNum) : '',
          options: this.coursOptions(),
        },
        { key: 'moniteur', label: 'Moniteur', type: 'select', options: this.moniteurOptions() },
      ],
      onSubmit: async (v) => {
        const selected = this.catalog.cours().find((item) => item.num === Number(v['cours'])) || cours;
        if (!selected) throw new Error('Cours introuvable');
        await this.api.updateCours({
          numCours: selected.num,
          niveau: selected.niveau,
          typeCours: selected.typeCours as TypeCours,
          support: selected.support as Support,
          creanau: selected.creneau,
          prix: selected.prix,
          moniteur: { numMoniteur: Number(v['moniteur']) },
        });
        this.modal.close();
        this.toast.show('Moniteur affecté au cours');
        await this.catalog.refresh();
      },
    });
  }

  private skieurPayload(v: Record<string, string>) {
    return {
      nomS: v['nomS'],
      prenomS: v['prenomS'],
      dateNaissance: v['dateNaissance'],
      ville: v['ville'],
      abonnement: {
        datedebut: v['datedebut'],
        dateFin: v['dateFin'],
        prixAbon: parseFloat(v['prixAbon']) || 0,
        typeAbonnement: v['typeAbonnement'] as TypeAbonnement,
      },
    };
  }

  private skieurOptions() {
    return this.catalog.skieurs().map((skieur) => ({
      value: String(skieur.num),
      label: `#${skieur.num} ${skieur.prenom} ${skieur.nom}`,
    }));
  }

  private pisteOptions() {
    return this.catalog.pistes().map((piste) => ({
      value: String(piste.num),
      label: `#${piste.num} ${piste.nom}`,
    }));
  }

  private coursOptions() {
    return this.catalog.cours().map((cours) => ({
      value: String(cours.num),
      label: `#${cours.num} · ${cours.typeLabel}`,
    }));
  }

  private moniteurOptions() {
    return this.catalog.moniteurs().map((moniteur) => ({
      value: String(moniteur.num),
      label: `#${moniteur.num} ${moniteur.prenom} ${moniteur.nom}`,
    }));
  }

  private inscriptionOptions() {
    return this.catalog.inscriptions()
      .filter((inscription) => inscription.num)
      .map((inscription) => ({
        value: String(inscription.num),
        label: `#${inscription.num} · ${inscription.skieurNom} · sem. ${inscription.semaine}`,
      }));
  }
}
