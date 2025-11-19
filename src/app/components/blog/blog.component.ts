import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { blogData } from '../../data/data';

interface BlogData{
    id: number;
    image: string;
    tag: string;
    date: string;
    title: string;
    company: string;
}

@Component({
  selector: 'app-blog',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  blogData:BlogData[] = blogData
}
