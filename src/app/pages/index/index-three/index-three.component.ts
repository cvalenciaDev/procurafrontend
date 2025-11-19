import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../components/navbar/navbar/navbar.component";
import { CounterComponent } from "../../../components/counter/counter.component";
import { jobData } from '../../../data/data';
import { AboutOneComponent } from "../../../components/about/about-one/about-one.component";
import { CategoryTwoComponent } from "../../../components/category/category-two/category-two.component";
import { BestCompanyComponent } from "../../../components/best-company/best-company.component";
import { BlogComponent } from "../../../components/blog/blog.component";
import { FooterComponent } from "../../../components/footer/footer.component";
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
  selector: 'app-index-three',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    CounterComponent,
    AboutOneComponent,
    CategoryTwoComponent,
    BestCompanyComponent,
    BlogComponent,
    FooterComponent,
    ScrollToTopComponent
],
  templateUrl: './index-three.component.html',
  styleUrl: './index-three.component.scss'
})
export class IndexThreeComponent {
  jobData:JobData[] = jobData
}
