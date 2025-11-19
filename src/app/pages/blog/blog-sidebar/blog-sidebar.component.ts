import { Component } from '@angular/core';
import { NavbarComponent } from "../../../components/navbar/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogSideComponent } from "../../../components/blog-side/blog-side.component";
import { blogData } from '../../../data/data';
import { FooterComponent } from "../../../components/footer/footer.component";
import { ScrollToTopComponent } from "../../../components/scroll-to-top/scroll-to-top.component";

interface BlogData{
    id: number;
    image: string;
    tag: string;
    date: string;
    title: string;
    company: string;
}
@Component({
  selector: 'app-blog-sidebar',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    BlogSideComponent,
    FooterComponent,
    ScrollToTopComponent
],
  templateUrl: './blog-sidebar.component.html',
  styleUrl: './blog-sidebar.component.scss'
})
export class BlogSidebarComponent {
  blogData:BlogData[] = blogData
}
