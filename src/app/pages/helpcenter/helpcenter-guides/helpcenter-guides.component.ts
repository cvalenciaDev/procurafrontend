import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../components/navbar/navbar/navbar.component";
import { guidesData } from '../../../data/data';
import { FooterComponent } from "../../../components/footer/footer.component";
import { ScrollToTopComponent } from "../../../components/scroll-to-top/scroll-to-top.component";

interface GuidesData{
  title: string;
  feature: string[];
}

@Component({
  selector: 'app-helpcenter-guides',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FooterComponent,
    ScrollToTopComponent
],
  templateUrl: './helpcenter-guides.component.html',
  styleUrl: './helpcenter-guides.component.scss'
})
export class HelpcenterGuidesComponent {
  guidesData:GuidesData[] =  guidesData
}
