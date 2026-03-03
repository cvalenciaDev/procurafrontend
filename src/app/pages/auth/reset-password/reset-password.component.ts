import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  onSubmit(): void {
    if (!this.email) return;
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    // TODO: conectar con endpoint real del backend
    setTimeout(() => {
      this.loading = false;
      this.successMsg =
        'Te enviamos un enlace a ' +
        this.email +
        '. Revisa tu bandeja de entrada.';
    }, 1500);
  }
}
