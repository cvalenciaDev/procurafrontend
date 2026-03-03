import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CompanyService, CompanyProfile } from '../../../services/company.service';
import { ProviderService, ProviderProfile } from '../../../services/provider.service';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SpinnerComponent],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss',
})
export class CreateProfileComponent {
  step: 'selectType' | 'profileForm' = 'selectType';
  userType: 'COMPANY' | 'PROVIDER' | '' = '';

  loading = false;
  spinnerMsg = '';
  errorMsg = '';
  successMsg = '';

  userName = '';

  companyProfile: CompanyProfile = {
    companyName: '',
    description: '',
    industry: '',
    city: '',
    country: '',
    contactEmail: '',
    contactPhone: '',
    employeesCount: null,
    foundedYear: null,
    taxId: '',
    website: '',
    address: '',
    logo: '',
    specialty: '',
    internationalPresence: '',
    completedProjects: '',
    fiscalAddress: '',
    maxCapacity: null,
  };

  providerProfile: ProviderProfile = {
    providerName: '',
    description: '',
    specialty: '',
    services: '',
    experienceYears: null,
    city: '',
    country: '',
    contactEmail: '',
    contactPhone: '',
    hourlyRate: null,
    isAvailable: true,
    workersCount: null,
    whatsappNumber: '',
    brochureUrl: '',
  };

  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private providerService: ProviderService,
    private router: Router,
  ) {
    // Verificar que el usuario esté logueado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/signup']);
      return;
    }

    const user = this.authService.getCurrentUser();
    this.userName = user?.firstName || 'Usuario';

    // Pre-llenar email del perfil con el del usuario
    if (user?.email) {
      this.companyProfile.contactEmail = user.email;
      this.providerProfile.contactEmail = user.email;
    }

    // Si ya tiene primaryType, saltar selección e ir directo al formulario faltante
    if (user?.primaryType) {
      this.userType = user.primaryType;

      // Si ya tiene el perfil de ese tipo, redirigir al home
      if (
        (user.primaryType === 'COMPANY' && user.hasCompanyProfile) ||
        (user.primaryType === 'PROVIDER' && user.hasProviderProfile)
      ) {
        this.router.navigate(['/job-list-one']);
        return;
      }

      // Ir directo al formulario del perfil faltante
      this.step = 'profileForm';
    }
  }

  selectUserType(type: 'COMPANY' | 'PROVIDER'): void {
    this.userType = type;
  }

  goToProfileForm(): void {
    this.errorMsg = '';
    if (!this.userType) {
      this.errorMsg = 'Selecciona un tipo de perfil.';
      return;
    }
    this.step = 'profileForm';
  }

  onSubmitProfile(): void {
    this.errorMsg = '';
    this.successMsg = '';
    this.loading = true;

    if (this.userType === 'COMPANY') {
      this.spinnerMsg = 'Creando perfil de empresa...';
      this.companyService.create(this.companyProfile).subscribe({
        next: () => this.onProfileSuccess(),
        error: (err: any) => this.onProfileError(err),
      });
    } else {
      this.spinnerMsg = 'Creando perfil de proveedor...';
      this.providerService.create(this.providerProfile).subscribe({
        next: () => this.onProfileSuccess(),
        error: (err: any) => this.onProfileError(err),
      });
    }
  }

  private onProfileSuccess(): void {
    this.spinnerMsg = '¡Perfil creado exitosamente!';
    setTimeout(() => {
      this.loading = false;
      this.successMsg = '¡Perfil creado! Redirigiendo...';
      setTimeout(() => this.router.navigate(['/job-list-one']), 1200);
    }, 800);
  }

  private onProfileError(err: any): void {
    this.loading = false;
    this.errorMsg =
      err.error?.message || 'Error al crear el perfil. Inténtalo de nuevo.';
  }
}
