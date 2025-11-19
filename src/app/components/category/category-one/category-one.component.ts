import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {category} from '../../../data/data';
import {companyData} from '../../../data/data';

import {tns} from 'tiny-slider'

interface CompanyData {
  id: number;
  image: string;
  name: string;
  desc: string;
  loction: string;
  jobs: number;
}

 
@Component({
  selector: 'app-category-one',
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './category-one.component.html',
  styleUrl: './category-one.component.scss'
})
export class CategoryOneComponent {
  company:CompanyData[] = companyData

  ngAfterViewInit(): void {
    tns({
      container: '.tiny-five-item',
      controls: true,
      mouseDrag: true,
      loop: true,
      rewind: true,
      autoplay: true,
      autoplayButtonOutput: false,
      autoplayTimeout: 3000,
      navPosition: "bottom",
      controlsText: ['<i class="mdi mdi-chevron-left "></i>', '<i class="mdi mdi-chevron-right"></i>'],
      nav: false,
      speed: 400,
      gutter: 0,
      responsive: {
          1025: {
              items: 5
          },

          992: {
              items: 4
          },

          767: {
              items: 3
          },

          425: {
              items: 1
          },
      },
  });
  }
}
