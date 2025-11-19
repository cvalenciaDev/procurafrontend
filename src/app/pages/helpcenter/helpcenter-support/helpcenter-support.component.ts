import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { ScrollToTopComponent } from "../../../components/scroll-to-top/scroll-to-top.component";
import { NavbarComponent } from "../../../components/navbar/navbar/navbar.component";

@Component({
  selector: 'app-helpcenter-support',
  imports: [
    CommonModule,
    RouterLink,
    FooterComponent,
    ScrollToTopComponent,
    NavbarComponent
],
  templateUrl: './helpcenter-support.component.html',
  styleUrl: './helpcenter-support.component.scss'
})
export class HelpcenterSupportComponent {

}
