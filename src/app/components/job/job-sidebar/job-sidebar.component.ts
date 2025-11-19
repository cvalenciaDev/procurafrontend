import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-sidebar',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './job-sidebar.component.html',
  styleUrl: './job-sidebar.component.scss'
})
export class JobSidebarComponent {

}
