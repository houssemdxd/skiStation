import { prettify } from '../constants/labels';
import { ColorLabel, CoursApi, InscriptionApi, MoniteurApi, PisteApi, SkieurApi } from '../models/api.models';
import { CoursView, InscriptionView, MoniteurView, PisteView, SkieurView } from '../models/view.models';

export function normalizeColor(raw: unknown): ColorLabel {
  const color = String(raw || '').toUpperCase();
  if (color.startsWith('VERT')) return 'verte';
  if (color.startsWith('BLEU')) return 'bleue';
  if (color.startsWith('ROUG')) return 'rouge';
  if (color.startsWith('NOIR')) return 'noire';
  return 'bleue';
}

export function normalizePiste(piste: PisteApi): PisteView {
  return {
    num: piste.numPiste,
    nom: piste.nomPiste,
    color: normalizeColor(piste.color),
    km: piste.Longeur ?? piste.longeur ?? 0,
    pente: piste.pente,
  };
}

export function normalizeCours(cours: CoursApi): CoursView {
  const typeRaw = cours.typeCours || '';
  const isParticulier = /PARTICUL/i.test(typeRaw);
  return {
    num: cours.numCours,
    niveau: cours.niveau,
    typeCours: typeRaw,
    typeLabel: prettify(typeRaw),
    isParticulier,
    support: cours.support,
    creneau: cours.creanau,
    prix: cours.prix,
    moniteur: cours.moniteur ? cours.moniteur.numMoniteur : null,
    capacite: isParticulier ? 1 : 8,
    inscrits: Array.isArray(cours.inscription) ? cours.inscription.length : 0,
  };
}

export function normalizeMoniteur(moniteur: MoniteurApi): MoniteurView {
  return {
    num: moniteur.numMoniteur,
    nom: moniteur.nomM,
    prenom: moniteur.prenomM,
    recrute: moniteur.dateRecus,
    prime: moniteur.prime || 0,
  };
}

export function normalizeSkieur(skieur: SkieurApi): SkieurView {
  const abonnement = skieur.abonnement;
  return {
    num: skieur.numSkieur,
    nom: skieur.nomS,
    prenom: skieur.prenomS,
    naissance: skieur.dateNaissance,
    ville: skieur.ville,
    abonnement: abonnement
      ? {
          id: abonnement.id ?? null,
          type: abonnement.typeAbonnement,
          debut: abonnement.datedebut,
          fin: abonnement.dateFin,
          prix: abonnement.prixAbon,
        }
      : null,
    inscriptions: (skieur.inscriptions || []).map((inscription) =>
      normalizeInscription(inscription, skieur),
    ),
    pistesFavorites: (skieur.pistes || []).map((piste) => piste.numPiste),
  };
}

export function normalizeInscription(inscription: InscriptionApi, fallbackSkieur?: SkieurApi): InscriptionView {
  const skieur = inscription.skieur || fallbackSkieur;
  return {
    num: inscription.numInscription ?? null,
    semaine: inscription.numSemaine,
    coursNum: inscription.cours ? inscription.cours.numCours : null,
    skieurNum: skieur?.numSkieur ?? null,
    skieurNom: skieur ? `${skieur.prenomS} ${skieur.nomS}`.trim() : '—',
    skieurVille: skieur?.ville || '—',
  };
}
