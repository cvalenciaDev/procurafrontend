import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../components/navbar/navbar/navbar.component";
import { FaqComponent } from "../../../components/faq/faq.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { ScrollToTopComponent } from "../../../components/scroll-to-top/scroll-to-top.component";

@Component({
  selector: 'app-helpcenter-faqs',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FaqComponent,
    FooterComponent,
    ScrollToTopComponent
],
  templateUrl: './helpcenter-faqs.component.html',
  styleUrl: './helpcenter-faqs.component.scss'
})
export class HelpcenterFaqsComponent {

  activeSections: Set<string> = new Set<string>(); 

  @HostListener('window:scroll', [])

  onScroll(): void {
    const sections = document.querySelectorAll('div[id]');

    const newActiveSections = new Set<string>();
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        newActiveSections.add(section.id);
      }
    });

    this.activeSections = newActiveSections; 
  }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
