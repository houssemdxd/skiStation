import { Component, Input } from '@angular/core';
import { ColorLabel } from '../../../core/models/api.models';

@Component({
  selector: 'app-color-badge',
  template: `
    <span>
      <span class="badge-color" [class]="'badge-' + color"></span>
      {{ label }}
    </span>
  `,
})
export class ColorBadgeComponent {
  @Input({ required: true }) color!: ColorLabel | string;

  get label(): string {
    return this.color ? this.color.charAt(0).toUpperCase() + this.color.slice(1) : '';
  }
}
