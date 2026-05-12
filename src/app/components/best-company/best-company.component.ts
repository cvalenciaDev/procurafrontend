import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompanyService, CompanyProfile } from '../../services/company.service';

@Component({
  selector: 'app-best-company',
  imports: [CommonModule, RouterLink],
  templateUrl: './best-company.component.html',
  styleUrl: './best-company.component.scss'
})
export class BestCompanyComponent implements OnInit {
  companies: CompanyProfile[] = [];
  loading = true;

  constructor(private readonly companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getAll().subscribe({
      next: (res) => {
        const all = Array.isArray(res?.data) ? res.data : [];
        this.companies = all.slice(0, 6);
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}
