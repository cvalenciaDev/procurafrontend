import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { servicesData } from '../../data/data';
import { tns } from 'tiny-slider';

interface ServicesData{
  image: string;
  title: string;
}

@Component({
  selector: 'app-tranding-services',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './tranding-services.component.html',
  styleUrl: './tranding-services.component.scss'
})
export class TrandingServicesComponent {
  servicesData:ServicesData[] = servicesData

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
