import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { categoryTwo } from '../../../data/data';

interface CategoryData{
  title: string;
  job: string;
}

@Component({
  selector: 'app-category-two',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './category-two.component.html',
  styleUrl: './category-two.component.scss'
})
export class CategoryTwoComponent {
  categoryData:CategoryData[] = categoryTwo
}
