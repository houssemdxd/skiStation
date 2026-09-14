import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-modal',
  imports: [FormsModule],
  template: `
    @if (modal.config(); as cfg) {
      <div class="modal-overlay" (click)="onOverlay($event)">
        <div class="modal-card">
          <div class="modal-head">
            <h3>{{ cfg.title }}</h3>
            <button type="button" (click)="modal.close()" aria-label="Fermer">✕</button>
          </div>
          <div class="modal-body">
            @for (f of cfg.fields; track f.key) {
              <div class="field">
                <label>{{ f.label }}</label>
                @if (f.type === 'select') {
                  <select [(ngModel)]="values[f.key]" [name]="f.key">
                    @for (o of f.options || []; track o.value) {
                      <option [value]="o.value">{{ o.label }}</option>
                    }
                  </select>
                } @else {
                  <input [type]="f.type || 'text'" [(ngModel)]="values[f.key]" [name]="f.key"
                         [placeholder]="f.placeholder || ''">
                }
              </div>
            }
            @if (modal.error()) {
              <div class="modal-error">{{ modal.error() }}</div>
            }
          </div>
          <div class="modal-foot">
            <button class="btn btn-ghost-dark btn-sm" type="button" (click)="modal.close()">Annuler</button>
            <button class="btn btn-amber btn-sm" type="button" [disabled]="modal.submitting()" (click)="submit()">
              {{ modal.submitting() ? 'Enregistrement…' : (cfg.submitLabel || 'Enregistrer') }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ModalComponent {
  readonly modal = inject(ModalService);
  values: Record<string, string> = {};

  constructor() {
    effect(() => {
      const config = this.modal.config();
      this.values = {};
      config?.fields.forEach((field) => {
        this.values[field.key] =
          field.value !== undefined && field.value !== null ? String(field.value) : '';
      });
    });
  }

  onOverlay(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.modal.close();
  }

  async submit(): Promise<void> {
    const cfg = this.modal.config();
    if (!cfg) return;
    this.modal.submitting.set(true);
    this.modal.error.set(null);
    try {
      await cfg.onSubmit(this.values);
    } catch (e: unknown) {
      this.modal.error.set('Erreur : ' + (e instanceof Error ? e.message : String(e)));
      this.modal.submitting.set(false);
    }
  }
}
