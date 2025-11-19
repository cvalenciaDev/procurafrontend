import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { faqData } from '../../data/data';

interface FaqData{
    id: number;
    title: string;
    desc: string;
}

@Component({
  selector: 'app-faq',
  imports: [
    CommonModule
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faqData:FaqData[] = faqData

  activeTab:number = 1
}
