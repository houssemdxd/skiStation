import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-brand-mark',
  template: `
    <svg class="brand-mark" [attr.width]="size" [attr.height]="size" viewBox="0 0 32 32" fill="none">
      <path d="M2 26L12 8l4 7 3-3 11 14H2z" fill="#E0A458"/>
    </svg>
  `,
})
export class BrandMarkComponent {
  @Input() size = 22;
}
