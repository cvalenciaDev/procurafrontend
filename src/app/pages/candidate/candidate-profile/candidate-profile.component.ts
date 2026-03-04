import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../components/navbar/navbar/navbar.component";
import { FooterTopComponent } from "../../../components/footer-top/footer-top.component";
import { ScrollToTopComponent } from "../../../components/scroll-to-top/scroll-to-top.component";
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { ProviderService, ProviderProfile } from '../../../services/provider.service';

@Component({
  selector: 'app-candidate-profile',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FooterTopComponent,
    ScrollToTopComponent,
    SpinnerComponent,
  ],
  templateUrl: './candidate-profile.component.html',
  styleUrl: './candidate-profile.component.scss'
})
export class CandidateProfileComponent implements OnInit {
  provider: ProviderProfile | null = null;
  loading = true;
  error = '';

  constructor(private readonly providerService: ProviderService) {}

  ngOnInit(): void {
    this.providerService.getMyProfile().subscribe({
      next: (res) => {
        this.provider = res.data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el perfil de proveedor.';
        this.loading = false;
      }
    });
  }
}
