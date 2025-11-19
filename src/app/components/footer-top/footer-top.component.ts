import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer-top',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './footer-top.component.html',
  styleUrl: './footer-top.component.scss'
})
export class FooterTopComponent {
  year:any

  ngOnInit(): void {
    this.year = new Date().getFullYear()
  }

  link = [ 

    {
      name:'Servicios',
      link:'/services'
    },
    {
      name:'Crear Requerimiento',
      link:'/job-post'
    },
    {
      name:'Sobre Nosotros',
      link:'/aboutus'
    },
    {
      name:'Plans',
      link:'/pricing'
    },
  ]

}
