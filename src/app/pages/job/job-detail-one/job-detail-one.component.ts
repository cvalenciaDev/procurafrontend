import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../components/navbar/navbar/navbar.component";
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
  selector: 'app-job-detail-one',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FooterTopComponent,
    ScrollToTopComponent
],
  templateUrl: './job-detail-one.component.html',
  styleUrl: './job-detail-one.component.scss'
})
export class JobDetailOneComponent {
  duties = [
    'Participate in requirements analysis',
    'Write clean, scalable code using C# and .NET frameworks',
    'Test and deploy applications and systems',
    'Revise, update, refactor and debug code',
    'Improve existing software',
    'Develop documentation throughout the software development life cycle (SDLC)',
    'Serve as an expert on applications and provide technical support',
  ]

  skill = [
    "Proven experience as a .NET Developer or Application Developer",
    "good understanding of SQL and Relational Databases, specifically Microsoft SQL Server.",
    "Experience designing, developing and creating RESTful web services and APIs",
    "Basic know how of Agile process and practices",
    "Good understanding of object-oriented programming.",
    "Good understanding of concurrent programming.",
    "Sound knowledge of application architecture and design.",
    "Excellent problem solving and analytical skills",
  ]

  jobData:JobData[] = jobData

  data:any
  id:any

  constructor(private router:ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id']
    this.data = this.jobData.find(item => item.id === parseInt(this.id))
  }
}
