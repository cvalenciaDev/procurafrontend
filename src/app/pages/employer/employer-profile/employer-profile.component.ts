import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../components/navbar/navbar/navbar.component";
import { companyData, jobData } from '../../../data/data';
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

interface CompanyData{
    id: number;
    image: string;
    name: string;
    desc: string;
    loction: string;
    jobs: number;
}

@Component({
  selector: 'app-employer-profile',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FooterTopComponent,
    ScrollToTopComponent
],
  templateUrl: './employer-profile.component.html',
  styleUrl: './employer-profile.component.scss'
})
export class EmployerProfileComponent {
  jobData:JobData[] = jobData

  companyData:CompanyData[] = companyData

  data:any
  id:any

  constructor(private router:ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id']
    this.data = this.companyData.find(item => item.id === parseInt(this.id))
  }
}
