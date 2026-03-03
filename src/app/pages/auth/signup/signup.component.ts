import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterLink, SpinnerComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  usuario = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
  };

  strengthLabel = 'Mín. 8 caracteres';
  strengthBars = [false, false, false];
  errorMsg = '';
  successMsg = '';
  loading = false;
  spinnerMsg = '';

  pwdRules = {
    length: false,
    lower: false,
    upper: false,
    number: false,
    special: false,
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  checkStrength(val: string): void {
    this.pwdRules.length = val.length >= 8;
    this.pwdRules.lower = /[a-z]/.test(val);
    this.pwdRules.upper = /[A-Z]/.test(val);
    this.pwdRules.number = /[0-9]/.test(val);
    this.pwdRules.special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);

    const passed = Object.values(this.pwdRules).filter(Boolean).length;
    this.strengthBars = [passed >= 2, passed >= 4, passed === 5];

    if (!val.length) this.strengthLabel = 'Mín. 8 caracteres';
    else if (passed <= 2) this.strengthLabel = 'Débil';
    else if (passed <= 4) this.strengthLabel = 'Media';
    else this.strengthLabel = 'Fuerte 💪';
  }

  getBarClass(index: number): string {
    if (!this.strengthBars[index]) return 'sbar';
    const count = this.strengthBars.filter(Boolean).length;
    if (count === 1) return 'sbar w';
    if (count === 2) return 'sbar m';
    return 'sbar s';
  }

  get passwordValid(): boolean {
    return Object.values(this.pwdRules).every(Boolean);
  }

  onRegister(): void {
    this.errorMsg = '';
    this.successMsg = '';

    if (!this.passwordValid) {
      this.errorMsg = 'La contraseña no cumple los requisitos de seguridad.';
      return;
    }
    if (this.usuario.password !== this.usuario.passwordConfirm) {
      this.errorMsg = 'Las contraseñas no coinciden.';
      return;
    }
    if (
      !this.usuario.firstName ||
      !this.usuario.lastName ||
      !this.usuario.username ||
      !this.usuario.email
    ) {
      this.errorMsg = 'Por favor completa todos los campos.';
      return;
    }

    this.loading = true;
    this.spinnerMsg = 'Creando tu cuenta...';

    this.authService.register(this.usuario).subscribe({
      next: (response) => {
        if (response.success && response.data?.accessToken) {
          // Registro exitoso con token → ir a crear perfil
          this.spinnerMsg = 'Cuenta creada, preparando tu perfil...';
          setTimeout(() => {
            this.loading = false;
            this.router.navigate(['/create-profile']);
          }, 800);
        } else {
          // Registro OK pero sin token → hacer login automático
          this.autoLogin();
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.errorMsg =
          err.error?.message || 'Error al registrar. Verifica tus datos.';
      },
    });
  }

  private autoLogin(): void {
    this.spinnerMsg = 'Iniciando sesión...';

    this.authService.login(this.usuario.email, this.usuario.password).subscribe({
      next: (response) => {
        if (response.success && response.data?.accessToken) {
          this.spinnerMsg = 'Sesión iniciada, preparando tu perfil...';
          setTimeout(() => {
            this.loading = false;
            this.router.navigate(['/create-profile']);
          }, 800);
        } else {
          this.loading = false;
          this.errorMsg = 'Cuenta creada pero no se pudo iniciar sesión automáticamente.';
        }
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Cuenta creada pero no se pudo iniciar sesión. Intenta desde el login.';
      },
    });
  }
}
