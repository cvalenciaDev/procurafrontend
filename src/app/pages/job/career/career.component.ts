import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../components/navbar/navbar/navbar.component";
import { AboutOneComponent } from "../../../components/about/about-one/about-one.component";
import { FeatureOneComponent } from "../../../components/feature/feature-one/feature-one.component";
import { FooterTopComponent } from "../../../components/footer-top/footer-top.component";
import { ScrollToTopComponent } from "../../../components/scroll-to-top/scroll-to-top.component";

@Component({
  selector: 'app-career',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    AboutOneComponent,
    FeatureOneComponent,
    FooterTopComponent,
    ScrollToTopComponent
],
  templateUrl: './career.component.html',
  styleUrl: './career.component.scss'
})
export class CareerComponent {
  openings = [
    {
      title:'Frontend Developer',
      number:1
    },
    {
      title:'Backend Developer',
      number:3
    },
    {
      title:'Web Developer',
      number:2
    },
  ]
}
