import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../components/navbar/navbar/navbar.component";
import { companyData } from '../../../data/data';
import { FaqComponent } from "../../../components/faq/faq.component";
import { FooterTopComponent } from "../../../components/footer-top/footer-top.component";
import { ScrollToTopComponent } from "../../../components/scroll-to-top/scroll-to-top.component";

interface CompanyData {
    id: number;
    image: string;
    name: string;
    desc: string;
    loction: string;
    jobs: number;
}

@Component({
  selector: 'app-employers',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FaqComponent,
    FooterTopComponent,
    ScrollToTopComponent
],
  templateUrl: './employers.component.html',
  styleUrl: './employers.component.scss'
})
export class EmployersComponent {
  companyData:CompanyData[] = companyData
}
