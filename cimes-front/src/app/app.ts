import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './shared/components/modal/modal';
import { ToastComponent } from './shared/components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModalComponent, ToastComponent],
  template: `
    <router-outlet />
    <app-modal />
    <app-toast />
  `,
})
export class App {}
