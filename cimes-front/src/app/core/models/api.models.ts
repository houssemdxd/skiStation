export type Color = 'VERT' | 'BLEU' | 'ROUGE' | 'NOIR';
export type Support = 'SKI' | 'SNOWBOARD';
export type TypeCours = 'COLLECTIF_ENFANT' | 'COLLECTIF_ADULTE' | 'PARTICULEIR';
export type TypeAbonnement = 'ANNUEL' | 'SEMESTER' | 'MENSUELL';
export type UserRole = 'skieur' | 'moniteur' | 'admin';
export type ApiStatus = 'idle' | 'loading' | 'connected' | 'offline';
export type ColorLabel = 'verte' | 'bleue' | 'rouge' | 'noire';

export interface PisteApi {
  numPiste: number;
  nomPiste: string;
  color: Color | string;
  Longeur?: number;
  longeur?: number;
  pente: number;
}

export interface MoniteurApi {
  numMoniteur: number;
  nomM: string;
  prenomM: string;
  dateRecus: string;
  prime?: number;
}

export interface CoursApi {
  numCours: number;
  niveau: number;
  typeCours: TypeCours | string;
  support: Support | string;
  prix: number;
  creanau: number;
  moniteur?: MoniteurApi | null;
  inscription?: { numInscription?: number }[];
}

export interface AbonnementApi {
  id?: number;
  datedebut: string;
  dateFin: string;
  prixAbon: number;
  typeAbonnement: TypeAbonnement | string;
}

export interface InscriptionApi {
  numInscription?: number;
  numSemaine: number;
  cours?: CoursApi | null;
  skieur?: SkieurApi | null;
}

export interface AbonnementPayload {
  id?: number;
  datedebut: string;
  dateFin: string;
  prixAbon: number;
  typeAbonnement: TypeAbonnement;
}

export interface SkieurApi {
  numSkieur: number;
  nomS: string;
  prenomS: string;
  dateNaissance: string;
  ville: string;
  abonnement?: AbonnementApi | null;
  inscriptions?: InscriptionApi[];
  pistes?: PisteApi[];
}

export interface PistePayload {
  nomPiste: string;
  color: Color;
  Longeur: number;
  pente: number;
}

export interface CoursPayload {
  niveau: number;
  typeCours: TypeCours;
  support: Support;
  creanau: number;
  prix: number;
  moniteur?: { numMoniteur: number };
}

export interface MoniteurPayload {
  nomM: string;
  prenomM: string;
  dateRecus: string;
}

export interface SkieurPayload {
  nomS: string;
  prenomS: string;
  dateNaissance: string;
  ville: string;
  abonnement?: AbonnementApi;
}
