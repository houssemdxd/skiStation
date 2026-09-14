import { Injectable, computed, signal } from '@angular/core';
import { UserRole } from '../models/api.models';

const KEY = 'cimes-session';

interface SessionState {
  loggedIn: boolean;
  role: UserRole;
  currentSkieurId: number;
  currentMoniteurId: number;
  displayName: string;
}

const DEFAULT: SessionState = {
  loggedIn: false,
  role: 'skieur',
  currentSkieurId: 1,
  currentMoniteurId: 1,
  displayName: '',
};

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly state = signal<SessionState>(readSession());

  readonly loggedIn = computed(() => this.state().loggedIn);
  readonly role = computed(() => this.state().role);
  readonly currentSkieurId = computed(() => this.state().currentSkieurId);
  readonly currentMoniteurId = computed(() => this.state().currentMoniteurId);
  readonly displayName = computed(() => this.state().displayName);

  login(role: UserRole, displayName: string): void {
    this.patch({ loggedIn: true, role, displayName });
  }

  logout(): void {
    this.patch(DEFAULT);
  }

  setSkieurId(id: number): void {
    this.patch({ currentSkieurId: id });
  }

  setMoniteurId(id: number): void {
    this.patch({ currentMoniteurId: id });
  }

  private patch(partial: Partial<SessionState>): void {
    const next = { ...this.state(), ...partial };
    this.state.set(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }
}

function readSession(): SessionState {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : DEFAULT;
  } catch {
    return DEFAULT;
  }
}
