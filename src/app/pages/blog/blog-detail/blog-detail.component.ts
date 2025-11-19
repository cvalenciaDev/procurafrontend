import { Component } from '@angular/core';
import { NavbarComponent } from "../../../components/navbar/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogSideComponent } from "../../../components/blog-side/blog-side.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { ScrollToTopComponent } from "../../../components/scroll-to-top/scroll-to-top.component";
import { blogData } from '../../../data/data';

interface BlogData{
  id: number;
  image: string;
  tag: string;
  date: string;
  title: string;
  company: string;
}

@Component({
  selector: 'app-blog-detail',
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    BlogSideComponent,
    FooterComponent,
    ScrollToTopComponent
],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent {
  data:any
  id:any

  blogData:BlogData[] = blogData

  constructor(private router:ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.data = this.blogData.find(item => item.id == parseInt(this.id))
  }

}
