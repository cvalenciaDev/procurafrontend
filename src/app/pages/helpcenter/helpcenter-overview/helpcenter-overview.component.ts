import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from "../../../components/navbar/navbar/navbar.component";
import { RouterLink } from '@angular/router';
import { FaqComponent } from "../../../components/faq/faq.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { ScrollToTopComponent } from "../../../components/scroll-to-top/scroll-to-top.component";

@Component({
  selector: 'app-helpcenter-overview',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FaqComponent,
    FooterComponent,
    ScrollToTopComponent
],
  templateUrl: './helpcenter-overview.component.html',
  styleUrl: './helpcenter-overview.component.scss'
})
export class HelpcenterOverviewComponent {
  aboutData = [
    {
      icon:'help-circle',
      title:'FAQs',
      link:'/helpcenter-faqs',
      desc:'The phrasal sequence of the is now so that many campaign and benefit'
    },
    {
      icon:'bookmark',
      title:'Guides / Support',
      link:'/helpcenter-guides',
      desc:'The phrasal sequence of the is now so that many campaign and benefit'
    },
    {
      icon:'settings',
      title:'Support Request',
      link:'/helpcenter-support',
      desc:'The phrasal sequence of the is now so that many campaign and benefit'
    },
  ]
}
