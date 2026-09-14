import { Component } from '@angular/core';

@Component({
  selector: 'app-mountain-scene',
  template: `
    <svg viewBox="0 0 480 320" width="100%" height="auto">
      <polygon points="0,320 90,140 150,220 230,90 480,320" fill="#152437"/>
      <polygon points="230,90 260,140 200,140" fill="#F6F8FA"/>
      <polygon points="150,220 180,190 200,190 220,220" fill="#F6F8FA"/>
      <polygon points="90,140 110,170 130,170 140,150" fill="#F6F8FA"/>
      <polygon points="150,320 260,150 300,200 360,150 480,320" fill="#0d1826"/>
      <path class="route-line" d="M20 300 C 90 250, 150 260, 230 190 S 380 130, 460 90" stroke="#E0A458" stroke-width="2.5" fill="none" stroke-dasharray="900" stroke-dashoffset="900" stroke-linecap="round" opacity="0.9"/>
      <circle cx="400" cy="60" r="26" fill="#1c3048"/>
    </svg>
  `,
})
export class MountainSceneComponent {}
