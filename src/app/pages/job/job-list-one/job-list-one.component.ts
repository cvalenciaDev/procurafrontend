import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../components/navbar/navbar/navbar.component";
import { FormOneComponent } from "../../../components/form/form-one/form-one.component";
import { FeatureOneComponent } from "../../../components/feature/feature-one/feature-one.component";
import { jobData } from '../../../data/data';
import { FooterTopComponent } from "../../../components/footer-top/footer-top.component";
import { ScrollToTopComponent } from "../../../components/scroll-to-top/scroll-to-top.component";

interface JobData{
    id: number;
    image: string;
    name: string;
    posted: string;
    jobType: string;
    title: string;
    location: string;
    applied: number;
    vacancy: number;
    salary: string;
    desc: string;
}

@Component({
  selector: 'app-job-list-one',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FormOneComponent,
    FeatureOneComponent,
    FooterTopComponent,
    ScrollToTopComponent
],
  templateUrl: './job-list-one.component.html',
  styleUrl: './job-list-one.component.scss'
})
export class JobListOneComponent {
  jobData:JobData[] = jobData
}
