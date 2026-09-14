import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserRole } from '../../../core/models/api.models';
import { SessionService } from '../../../core/services/session.service';
import { SnowfallComponent } from '../../../shared/components/snowfall/snowfall';
import { BrandMarkComponent, MountainSceneComponent } from '../../../shared/icons';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, SnowfallComponent, BrandMarkComponent, MountainSceneComponent],
  templateUrl: './login.html',
})
export class LoginComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly session = inject(SessionService);

  role: UserRole = 'skieur';
  identifiant = '';
  password = '';

  readonly quotes: Record<UserRole, [string, string]> = {
    skieur: ["Trois hivers ici, et je découvre encore une piste que je n'avais jamais prise.", '— Camille M., abonnée annuelle'],
    moniteur: ['Chaque semaine, un nouveau groupe, un nouveau niveau, la même montagne.', '— Sacha B., moniteur depuis 2016'],
    admin: ["Le domaine ne s'arrête jamais de tourner — le planning non plus.", '— Direction de la station'],
  };

  readonly placeholders: Record<UserRole, string> = {
    skieur: 'camille.moreau',
    moniteur: 'sacha.bertillon',
    admin: 'admin',
  };

  constructor() {
    const q = this.route.snapshot.queryParamMap.get('role');
    if (q === 'skieur' || q === 'moniteur' || q === 'admin') this.role = q;
  }

  setRole(role: UserRole): void {
    this.role = role;
    void this.router.navigate([], { queryParams: { role }, queryParamsHandling: 'merge' });
  }

  connect(): void {
    const name =
      this.identifiant.trim() ||
      (this.role === 'skieur' ? 'Camille Moreau' : this.role === 'moniteur' ? 'Sacha Bertillon' : 'Administrateur');
    this.session.login(this.role, name);
    void this.router.navigate(['/espace', this.role, 'overview']);
  }
}
