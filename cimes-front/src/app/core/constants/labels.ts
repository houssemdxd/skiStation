import { TypeAbonnement } from '../models/api.models';
import { NavItem, UserRole } from '../models/view.models';

export const NIVEAU_LABEL: Record<number, string> = {
  1: '1ère étoile',
  2: '2ème étoile',
  3: '3ème étoile',
  4: 'Flèche / Compétition',
};

export const ROLE_LABEL: Record<UserRole, string> = {
  skieur: 'Espace skieur',
  moniteur: 'Espace moniteur',
  admin: 'Administration',
};

export const ROLE_INITIALS: Record<UserRole, string> = {
  skieur: 'CM',
  moniteur: 'SB',
  admin: 'AD',
};

export const ROLE_NAME: Record<UserRole, string> = {
  skieur: 'Camille Moreau',
  moniteur: 'Sacha Bertillon',
  admin: 'Administrateur',
};

export const TYPE_ABONNEMENT_OPTIONS = [
  { value: 'ANNUEL', label: 'Annuel' },
  { value: 'SEMESTER', label: 'Semestriel' },
  { value: 'MENSUELL', label: 'Mensuel' },
];

export const SUPPORT_OPTIONS = [
  { value: 'SKI', label: 'Ski' },
  { value: 'SNOWBOARD', label: 'Snowboard' },
];

export const TYPE_COURS_OPTIONS = [
  { value: 'COLLECTIF_ADULTE', label: 'Collectif adulte' },
  { value: 'COLLECTIF_ENFANT', label: 'Collectif enfant' },
  { value: 'PARTICULEIR', label: 'Particulier' },
];

export const FORMULES: { type: TypeAbonnement; label: string; prix: number; months: number }[] = [
  { type: 'MENSUELL', label: 'Mensuel', prix: 89, months: 1 },
  { type: 'SEMESTER', label: 'Semestriel', prix: 395, months: 6 },
  { type: 'ANNUEL', label: 'Annuel', prix: 450, months: 12 },
];

export const NAV_BY_ROLE: Record<UserRole, NavItem[]> = {
  skieur: [
    { k: 'overview', l: 'Aperçu', icon: 'home' },
    { k: 'cours', l: 'Cours', icon: 'cours' },
    { k: 'pistes', l: 'Pistes', icon: 'piste' },
    { k: 'abonnement', l: 'Abonnement', icon: 'abon' },
  ],
  moniteur: [
    { k: 'overview', l: 'Aperçu', icon: 'home' },
    { k: 'planning', l: 'Mon planning', icon: 'cours' },
    { k: 'eleves', l: 'Élèves', icon: 'people' },
  ],
  admin: [
    { k: 'overview', l: 'Aperçu', icon: 'home' },
    { k: 'cours', l: 'Cours', icon: 'cours' },
    { k: 'pistes', l: 'Pistes', icon: 'piste' },
    { k: 'moniteurs', l: 'Moniteurs', icon: 'people' },
    { k: 'skieurs', l: 'Skieurs', icon: 'people' },
    { k: 'inscriptions', l: 'Inscriptions', icon: 'cours' },
    { k: 'abonnements', l: 'Abonnements', icon: 'abon' },
    { k: 'affectations', l: 'Affectations', icon: 'cours' },
  ],
};

export function prettify(raw: unknown): string {
  if (raw === undefined || raw === null || raw === '') return '—';
  return String(raw)
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/(^|\s)\S/g, (t) => t.toUpperCase());
}

export function formatFrDate(d?: string | null): string {
  if (!d) return '—';
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return String(d);
  return dt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function computeStatut(finDate?: string | null): 'active' | 'closed' {
  if (!finDate) return 'active';
  return new Date(finDate) >= new Date() ? 'active' : 'closed';
}

export function niveauLabel(niveau: number): string {
  return NIVEAU_LABEL[niveau] || `Niveau ${niveau}`;
}
