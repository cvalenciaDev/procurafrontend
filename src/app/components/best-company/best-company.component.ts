import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { companyData } from '../../data/data';

interface CompanyData{
    id: number;
    image: string;
    name: string;
    desc: string;
    loction: string;
    jobs: number;
}

@Component({
  selector: 'app-best-company',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './best-company.component.html',
  styleUrl: './best-company.component.scss'
})
export class BestCompanyComponent {
  companyData:CompanyData[] = companyData
}
