import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { FooterTopComponent } from '../../../components/footer-top/footer-top.component';
import { ScrollToTopComponent } from '../../../components/scroll-to-top/scroll-to-top.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { CompanyService, CompanyProfile } from '../../../services/company.service';

@Component({
  selector: 'app-employer-profile',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FooterTopComponent,
    ScrollToTopComponent,
    SpinnerComponent,
  ],
  templateUrl: './employer-profile.component.html',
  styleUrl: './employer-profile.component.scss',
})
export class EmployerProfileComponent implements OnInit {
  company: CompanyProfile | null = null;
  loading = true;
  error = '';
  isOwnProfile = false;

  constructor(
    private readonly companyService: CompanyService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.companyService.getById(Number(id)).subscribe({
        next: (res) => {
          this.company = res.data;
          this.loading = false;
        },
        error: () => {
          this.error = 'No se pudo cargar el perfil de empresa.';
          this.loading = false;
        },
      });
    } else {
      this.isOwnProfile = true;
      this.companyService.getMyProfile().subscribe({
        next: (res) => {
          this.company = res.data;
          this.loading = false;
        },
        error: () => {
          this.error = 'No se pudo cargar el perfil de empresa.';
          this.loading = false;
        },
      });
    }
  }
}
