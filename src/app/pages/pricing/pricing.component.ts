import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar/navbar.component";
import { RouterLink } from '@angular/router';
import { FaqComponent } from "../../components/faq/faq.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ScrollToTopComponent } from "../../components/scroll-to-top/scroll-to-top.component";

@Component({
  selector: 'app-pricing',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FaqComponent,
    FooterComponent,
    ScrollToTopComponent
],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {

}
