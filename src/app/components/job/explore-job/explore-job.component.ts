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
  selector: 'app-explore-job',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './explore-job.component.html',
  styleUrl: './explore-job.component.scss'
})
export class ExploreJobComponent {
  jobData:JobData[] = jobData
}
