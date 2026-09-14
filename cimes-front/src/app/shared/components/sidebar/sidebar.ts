import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_BY_ROLE, ROLE_INITIALS, ROLE_LABEL } from '../../../core/constants/labels';
import { SessionService } from '../../../core/services/session.service';
import { BrandMarkComponent, IconComponent } from '../../icons';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, BrandMarkComponent, IconComponent],
  template: `
    <aside class="sidebar">
      <a class="side-brand" routerLink="/">
        <app-brand-mark [size]="20" /><span>Cimes</span>
      </a>
      <div class="side-role">{{ roleLabel }}</div>
      <nav class="side-nav">
        @for (it of items; track it.k) {
          <a [routerLink]="['/espace', role, it.k]" routerLinkActive="active">
            <app-icon [name]="it.icon" /><span>{{ it.l }}</span>
          </a>
        }
      </nav>
      <div class="side-foot">
        <div class="side-user">
          <div class="avatar">{{ initials }}</div>
          <span>{{ session.displayName() }}</span>
        </div>
        <a class="logout-link" href="javascript:void(0)" (click)="logout()">
          <app-icon name="logout" /><span>Se déconnecter</span>
        </a>
      </div>
    </aside>
  `,
})
export class SidebarComponent {
  readonly session = inject(SessionService);
  private readonly router = inject(Router);

  get role() {
    return this.session.role();
  }
  get items() {
    return NAV_BY_ROLE[this.role];
  }
  get roleLabel() {
    return ROLE_LABEL[this.role];
  }
  get initials() {
    return ROLE_INITIALS[this.role];
  }

  logout(): void {
    this.session.logout();
    void this.router.navigateByUrl('/');
  }
}
