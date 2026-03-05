import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { ScrollToTopComponent } from '../../../components/scroll-to-top/scroll-to-top.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-candidate-profile-setting',
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    ScrollToTopComponent,
    SpinnerComponent,
  ],
  templateUrl: './candidate-profile-setting.component.html',
  styleUrl: './candidate-profile-setting.component.scss',
})
export class CandidateProfileSettingComponent implements OnInit {
  currentUser: User | null = null;

  userData = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
  };

  loading = false;
  spinnerMsg = '';
  profileMsg = '';
  profileError = '';
  showDeleteConfirm = false;
  deleteError = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      if (user) {
        this.userData = {
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          username: user.username || '',
          email: user.email || '',
          phone: user.phone || '',
        };
      }
    });
    this.authService.refreshUserProfiles().subscribe();
  }

  get userTypeLabel(): string {
    if (!this.currentUser) return '';
    if (this.currentUser.hasCompanyProfile && this.currentUser.hasProviderProfile) return 'Empresa y Proveedor';
    if (this.currentUser.hasCompanyProfile) return 'Empresa';
    if (this.currentUser.hasProviderProfile) return 'Proveedor';
    return 'Sin perfil';
  }

  get userInitials(): string {
    const f = this.userData.firstName?.[0] || '';
    const l = this.userData.lastName?.[0] || '';
    return (f + l).toUpperCase();
  }

  onSaveProfile(): void {
    this.profileMsg = '';
    this.profileError = '';

    if (!this.userData.firstName || !this.userData.lastName || !this.userData.username) {
      this.profileError = 'Por favor completa todos los campos obligatorios.';
      return;
    }

    this.loading = true;
    this.spinnerMsg = 'Guardando cambios...';

    this.authService.updateProfile({
      username: this.userData.username,
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      phone: this.userData.phone,
    }).subscribe({
      next: () => {
        this.loading = false;
        this.profileMsg = 'Datos actualizados correctamente.';
      },
      error: (err: any) => {
        this.loading = false;
        this.profileError = err.error?.message || 'Error al guardar los cambios.';
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onDeleteAccount(): void {
    this.deleteError = '';
    this.loading = true;
    this.spinnerMsg = 'Eliminando cuenta...';
    this.authService.deleteAccount().subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.loading = false;
        this.showDeleteConfirm = false;
        this.deleteError = err.error?.message || 'Error al eliminar la cuenta.';
      },
    });
  }
}
