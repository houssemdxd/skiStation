import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `
    @switch (name) {
      @case ('home') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg>
      }
      @case ('cours') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5h16v13H4z"/><path d="M8 3v4M16 3v4M4 9h16"/></svg>
      }
      @case ('piste') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 20L14 4l3 5-2 3 3 4-2 4z"/></svg>
      }
      @case ('abon') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7h18v11H3z"/><path d="M3 11h18"/></svg>
      }
      @case ('people') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c0-3.5 2.9-6 6.5-6s6.5 2.5 6.5 6"/><circle cx="17.5" cy="9" r="2.4"/><path d="M15.5 14.3c2.6.3 4.5 2.4 4.5 5.7"/></svg>
      }
      @case ('logout') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>
      }
      @case ('star') {
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3 6.5 7 .9-5.2 4.8 1.4 7-6.2-3.6-6.2 3.6 1.4-7L1 9.4l7-.9z"/></svg>
      }
      @case ('star-outline') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2l3 6.5 7 .9-5.2 4.8 1.4 7-6.2-3.6-6.2 3.6 1.4-7L1 9.4l7-.9z"/></svg>
      }
    }
  `,
})
export class IconComponent {
  @Input({ required: true }) name!: string;
}
