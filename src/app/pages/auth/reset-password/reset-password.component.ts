import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  email = '';
  loading = false;
  successMsg = '';
  errorMsg = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (!this.email) return;
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        this.loading = false;
        this.successMsg =
          'Te enviamos un enlace a ' + this.email + '. Revisa tu bandeja de entrada.';
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg =
          err?.error?.message || 'No se pudo enviar el enlace. Intenta de nuevo.';
      },
    });
  }
}
