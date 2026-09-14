import { Injectable, signal } from '@angular/core';
import { ModalConfig } from '../models/view.models';

@Injectable({ providedIn: 'root' })
export class ModalService {
  readonly config = signal<ModalConfig | null>(null);
  readonly error = signal<string | null>(null);
  readonly submitting = signal(false);

  open(config: ModalConfig): void {
    this.error.set(null);
    this.submitting.set(false);
    this.config.set(config);
  }

  close(): void {
    this.config.set(null);
    this.error.set(null);
    this.submitting.set(false);
  }
}
