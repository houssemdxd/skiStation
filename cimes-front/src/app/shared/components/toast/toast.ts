import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  template: `
    @if (toast.message(); as msg) {
      <div class="toast">{{ msg }}</div>
    }
  `,
})
export class ToastComponent {
  readonly toast = inject(ToastService);
}
