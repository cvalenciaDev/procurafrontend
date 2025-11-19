import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar/navbar.component";
import { AboutOneComponent } from "../../components/about/about-one/about-one.component";
import { aboutData, teamData } from '../../data/data';
import { FooterComponent } from "../../components/footer/footer.component";
import { ScrollToTopComponent } from "../../components/scroll-to-top/scroll-to-top.component";

interface TeamData{
  image: string;
  social: string[];
  name: string;
  position: string;
}

interface AboutData{
    icon: string;
    title: string;
    desc: string;
}

@Component({
  selector: 'app-aboutus',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    AboutOneComponent,
    FooterComponent,
    ScrollToTopComponent
],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent {
  aboutData:AboutData[]  = aboutData

  teamData:TeamData[] = teamData
}
