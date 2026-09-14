import { ColorLabel, Support, UserRole } from './api.models';

export interface PisteView {
  num: number;
  nom: string;
  color: ColorLabel;
  km: number;
  pente: number;
}

export interface CoursView {
  num: number;
  niveau: number;
  typeCours: string;
  typeLabel: string;
  isParticulier: boolean;
  support: Support | string;
  creneau: number;
  prix: number;
  moniteur: number | null;
  capacite: number;
  inscrits: number;
}

export interface MoniteurView {
  num: number;
  nom: string;
  prenom: string;
  recrute: string | null;
  prime: number;
}

export interface AbonnementView {
  id: number | null;
  type: string;
  debut: string;
  fin: string;
  prix: number;
}

export interface InscriptionView {
  num: number | null;
  semaine: number;
  coursNum: number | null;
  skieurNum: number | null;
  skieurNom: string;
  skieurVille: string;
}

export interface SkieurView {
  num: number;
  nom: string;
  prenom: string;
  naissance: string;
  ville: string;
  abonnement: AbonnementView | null;
  inscriptions: InscriptionView[];
  pistesFavorites: number[];
}

export const EMPTY_SKIEUR: SkieurView = {
  num: 0,
  nom: '',
  prenom: '',
  naissance: '',
  ville: '',
  abonnement: null,
  inscriptions: [] as InscriptionView[],
  pistesFavorites: [],
};

export const EMPTY_MONITEUR: MoniteurView = {
  num: 0,
  nom: '—',
  prenom: '',
  recrute: null,
  prime: 0,
};

export const EMPTY_COURS: CoursView = {
  num: 0,
  niveau: 1,
  typeCours: '',
  typeLabel: '—',
  isParticulier: false,
  support: 'SKI',
  creneau: 1,
  prix: 0,
  moniteur: null,
  capacite: 1,
  inscrits: 0,
};

export interface NavItem {
  k: string;
  l: string;
  icon: 'home' | 'cours' | 'piste' | 'abon' | 'people';
}

export interface ModalField {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'select';
  value?: string | number;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

export interface ModalConfig {
  title: string;
  fields: ModalField[];
  submitLabel?: string;
  onSubmit: (values: Record<string, string>) => Promise<void>;
}

export type { UserRole };
