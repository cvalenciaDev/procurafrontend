import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarDarkComponent } from "../../../components/navbar/navbar-dark/navbar-dark.component";
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
  selector: 'app-candidate-profile',
  imports: [
    CommonModule,
    RouterLink,
    NavbarDarkComponent,
    FooterTopComponent,
    ScrollToTopComponent
],
  templateUrl: './candidate-profile.component.html',
  styleUrl: './candidate-profile.component.scss'
})
export class CandidateProfileComponent {
  skill = [
    {
      title:'HTML',
      percentage: '84%'
    },
    {
      title:'CSS',
      percentage: '75%'
    },
    {
      title:'JQuery',
      percentage: '79%'
    },
    {
      title:'WordPress',
      percentage: '79%'
    },
    {
      title:'Figma',
      percentage: '85%'
    },
    {
      title:'Illustration',
      percentage: '65%'
    },
  ]

  experience = [
    {
      image:'/assets/images/company/linkedin.png',
      year:'2019-22',
      title:'Full Stack Developer',
      loction:'Linkedin - U.S.A.',
      desc:`It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time certain letters were added or deleted at various positions within the text.`
    },
    {
      image:'/assets/images/company/lenovo-logo.png',
      year:'2017-19',
      title:'Back-end Developer',
      loction:'Lenovo - China',
      desc:`It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time certain letters were added or deleted at various positions within the text.`
    },
  ]

  personalDetail = [
    {
      icon:'mail',
      title:'Email:',
      desc:'thomas@mail.com'
    },
    {
      icon:'gift',
      title:'D.O.B.:',
      desc:'31st Dec, 1996'
    },
    {
      icon:'home',
      title:'Address:',
      desc:'15 Razy street'
    },
    {
      icon:'map-pin',
      title:'City:',
      desc:'London'
    },
    {
      icon:'globe',
      title:'Country:',
      desc:'UK'
    },
    {
      icon:'phone',
      title:'Mobile:',
      desc:'(+125) 1542-8452'
    },
  ]

  candidateData:CandidateData[] = candidateData

  data:any
  id:any
  constructor(private router:ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id']
    this.data = this.candidateData.find(item => item.id === parseInt(this.id))
  }
}
