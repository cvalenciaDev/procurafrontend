import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { FaqComponent } from '../../../components/faq/faq.component';
import { FooterTopComponent } from '../../../components/footer-top/footer-top.component';
import { ScrollToTopComponent } from '../../../components/scroll-to-top/scroll-to-top.component';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { CompanyService, CompanyProfile } from '../../../services/company.service';

@Component({
  selector: 'app-employers',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FaqComponent,
    FooterTopComponent,
    ScrollToTopComponent,
    SpinnerComponent,
  ],
  templateUrl: './employers.component.html',
  styleUrl: './employers.component.scss',
})
export class EmployersComponent implements OnInit {
  companies: CompanyProfile[] = [];
  loading = true;
  error = '';

  constructor(private readonly companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getAll().subscribe({
      next: (res) => {
        this.companies = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las empresas.';
        this.loading = false;
      },
    });
  }
}
