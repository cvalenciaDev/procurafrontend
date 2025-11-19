import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from "../../../components/navbar/navbar/navbar.component";
import { RouterLink } from '@angular/router';
import { category } from '../../../data/data';
import { FaqComponent } from "../../../components/faq/faq.component";
import { FooterTopComponent } from "../../../components/footer-top/footer-top.component";
import { ScrollToTopComponent } from "../../../components/scroll-to-top/scroll-to-top.component";

interface Category{
    icon: string;
    title1: string;
    title2: string;
    jobs: string;
}

@Component({
  selector: 'app-job-categories',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FaqComponent,
    FooterTopComponent,
    ScrollToTopComponent
],
  templateUrl: './job-categories.component.html',
  styleUrl: './job-categories.component.scss'
})

export class JobCategoriesComponent {
  category:Category[] = category
}
