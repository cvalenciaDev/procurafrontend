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
  step: 'register' | 'selectType' | 'profileForm' = 'register';

  usuario = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    userType: '',
    phone: '',
  };

  companyProfile = {
    companyName: '',
    rif: '',
    industry: '',
    description: '',
    website: '',
    phone: '',
    city: '',
  };

  providerProfile = {
    businessName: '',
    rif: '',
    specialty: '',
    description: '',
    website: '',
    phone: '',
    city: '',
  };

  strengthLabel = 'Mín. 8 caracteres';
  strengthBars = [false, false, false];
  errorMsg = '';
  successMsg = '';
  loading = false;
  spinnerMsg = '';

  /** Token obtenido tras registro + auto-login */
  private authToken = '';

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

  /** STEP 1 → Registra en BD + auto-login → pasa a selección de tipo */
  goToSelectType(): void {
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

    // Llamada al backend: registrar cuenta
    this.loading = true;
    this.spinnerMsg = 'Creando tu cuenta...';

    const registerPayload = {
      firstName: this.usuario.firstName,
      lastName: this.usuario.lastName,
      username: this.usuario.username,
      email: this.usuario.email,
      password: this.usuario.password,
      passwordConfirm: this.usuario.passwordConfirm,
    };

    this.authService.register(registerPayload).subscribe({
      next: (response) => {
        if (response.success && response.data?.accessToken) {
          // Registro exitoso, ya tenemos el token
          this.authToken = response.data.accessToken;
          this.spinnerMsg = 'Cuenta creada, preparando tu perfil...';
          setTimeout(() => {
            this.loading = false;
            this.successMsg = '¡Cuenta creada exitosamente!';
            this.step = 'selectType';
          }, 800);
        } else {
          // Registro OK pero sin token → hacer login manual
          this.autoLogin();
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg =
          err.error?.message || 'Error al registrar. Verifica tus datos.';
      },
    });
  }

  /** Login automático después del registro si no se recibió token */
  private autoLogin(): void {
    this.spinnerMsg = 'Iniciando sesión...';

    this.authService.login(this.usuario.email, this.usuario.password).subscribe({
      next: (response) => {
        if (response.success && response.data?.accessToken) {
          this.authToken = response.data.accessToken;
          this.spinnerMsg = 'Sesión iniciada, preparando tu perfil...';
          setTimeout(() => {
            this.loading = false;
            this.successMsg = '¡Cuenta creada exitosamente!';
            this.step = 'selectType';
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

  selectUserType(type: 'COMPANY' | 'PROVIDER'): void {
    this.usuario.userType = type;
  }

  goToProfileForm(): void {
    this.errorMsg = '';
    if (!this.usuario.userType) {
      this.errorMsg = 'Selecciona un tipo de perfil.';
      return;
    }
    this.step = 'profileForm';
  }

  /** STEP 3 → Envía perfil al backend con el token */
  onRegister(): void {
    this.errorMsg = '';
    this.successMsg = '';

    const profile =
      this.usuario.userType === 'COMPANY'
        ? this.companyProfile
        : this.providerProfile;

    const payload = {
      userType: this.usuario.userType,
      profile,
    };

    this.loading = true;
    this.spinnerMsg = 'Guardando tu perfil...';

    // Enviar perfil — el token ya está en localStorage via AuthService
    this.authService.createProfile(payload).subscribe({
      next: () => {
        this.spinnerMsg = '¡Perfil creado exitosamente!';
        setTimeout(() => {
          this.loading = false;
          this.successMsg = '¡Registro completo! Redirigiendo...';
          setTimeout(() => this.router.navigate(['/jobs']), 1200);
        }, 800);
      },
      error: (err: any) => {
        this.loading = false;
        this.errorMsg =
          err.error?.message || 'Error al guardar el perfil. Inténtalo de nuevo.';
      },
    });
  }
}
