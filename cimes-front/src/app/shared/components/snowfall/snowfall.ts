import { Component } from '@angular/core';

@Component({
  selector: 'app-snowfall',
  template: `
    <div class="snowfall">
      @for (f of flakes; track $index) {
        <span class="flake" [style.width.px]="f.size" [style.height.px]="f.size"
              [style.left.%]="f.left" [style.opacity]="f.op"
              [style.--drift]="f.drift + 'px'"
              [style.animation-duration.s]="f.dur"
              [style.animation-delay.s]="f.delay"></span>
      }
    </div>
  `,
})
export class SnowfallComponent {
  readonly flakes = Array.from({ length: 16 }, () => ({
    size: +(Math.random() * 3 + 2).toFixed(1),
    left: +(Math.random() * 100).toFixed(1),
    dur: +(Math.random() * 6 + 6).toFixed(1),
    delay: +(Math.random() * -10).toFixed(1),
    drift: +(Math.random() * 40 - 20).toFixed(0),
    op: +(Math.random() * 0.4 + 0.35).toFixed(2),
  }));
}
