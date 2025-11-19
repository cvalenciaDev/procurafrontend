import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-one',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './about-one.component.html',
  styleUrl: './about-one.component.scss'
})
export class AboutOneComponent {

}
