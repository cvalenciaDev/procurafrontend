import { Component } from '@angular/core';
import { NavbarComponent } from "../../../components/navbar/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  selector: 'app-blogs',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FooterComponent,
    ScrollToTopComponent
],

  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {
  blogData:BlogData[] = blogData
}
