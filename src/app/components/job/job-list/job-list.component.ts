import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { jobData } from '../../../data/data';

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
  selector: 'app-job-list',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent {
  jobData:JobData[] = jobData
}
