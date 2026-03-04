import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink, FormsModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;
  showSpinner = false;
  spinnerMsg = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogin(): void {
    this.loading = true;
    this.error = '';
    this.showSpinner = true;
    this.spinnerMsg = 'Iniciando sesión...';

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.success && response.data?.user) {
          const user = response.data.user;
          this.spinnerMsg = 'Verificando tu perfil...';

          // Sin ningún perfil → forzar creación de perfil
          if (!user.hasCompanyProfile && !user.hasProviderProfile) {
            this.spinnerMsg = 'Redirigiendo a crear tu perfil...';
            setTimeout(() => {
              this.showSpinner = false;
              this.loading = false;
              this.router.navigate(['/create-profile']);
            }, 1000);
            return;
          }

          // Validar perfiles via API y luego determinar tipo activo
          const targetType: 'COMPANY' | 'PROVIDER' = user.hasProviderProfile ? 'PROVIDER' : 'COMPANY';
          this.authService.updateUserType(targetType).subscribe({
            next: () => {
              // Validar con /companies/my y /providers/my para actualizar el estado
              this.authService.refreshUserProfiles().subscribe();
              this.spinnerMsg = '¡Bienvenido de vuelta!';
              setTimeout(() => {
                this.showSpinner = false;
                this.loading = false;
                this.router.navigate(['/job-list-one']);
              }, 800);
            },
            error: () => {
              this.showSpinner = false;
              this.loading = false;
              this.router.navigate(['/job-list-one']);
            }
          });
        } else {
          this.showSpinner = false;
          this.loading = false;
          this.router.navigate(['/job-list-one']);
        }
      },
      error: (err) => {
        this.showSpinner = false;
        this.error = err.error?.message || 'Error al iniciar sesión';
        this.loading = false;
      },
    });
  }
}
