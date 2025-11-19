import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar/navbar.component";
import { RouterLink } from '@angular/router';
import { aboutData } from '../../data/data';
import { FaqComponent } from "../../components/faq/faq.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ScrollToTopComponent } from "../../components/scroll-to-top/scroll-to-top.component";

interface AboutData{
  icon: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-services',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FaqComponent,
    FooterComponent,
    ScrollToTopComponent
],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  aboutData:AboutData[] = aboutData
}
