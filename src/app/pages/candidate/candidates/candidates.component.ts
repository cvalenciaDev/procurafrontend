import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../components/navbar/navbar/navbar.component";
import { candidateData } from '../../../data/data';
import { FooterTopComponent } from "../../../components/footer-top/footer-top.component";
import { ScrollToTopComponent } from "../../../components/scroll-to-top/scroll-to-top.component";

interface CandidateData{
    id: number;
    image: string;
    name: string;
    position: string;
    feature: string[];
    salary: string;
    experience: string;
    rate: boolean;
}

@Component({
  selector: 'app-candidates',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FooterTopComponent,
    ScrollToTopComponent
],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})
export class CandidatesComponent {
  candidateData:CandidateData[] = candidateData
}
