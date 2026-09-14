import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-dashboard-shell',
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="dash">
      <app-sidebar />
      <main class="dash-main">
        <router-outlet />
      </main>
    </div>
  `,
})
export class DashboardShellComponent {}
