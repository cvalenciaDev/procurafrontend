import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-side',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './blog-side.component.html',
  styleUrl: './blog-side.component.scss'
})
export class BlogSideComponent {
  recentPost = [
    {
      image:'/assets/images/blog/01.jpg',
      title:'Consultant Business',
      date:'13th March 2025'
    },
    {
      image:'/assets/images/blog/02.jpg',
      title:'Grow Your Business',
      date:'5th May 2025'
    },
    {
      image:'/assets/images/blog/03.jpg',
      title:'Look On The Glorious Balance',
      date:'19th June 2025'
    },
  ]

  tag = [
    'Business','Finance','Marketing','Fashion','Bride','Lifestyle','Travel','Beauty','Video','Audio'
  ]
}
