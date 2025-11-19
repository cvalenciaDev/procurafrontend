import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { featureData } from '../../../data/data';

interface FeatureData{
  icon: string;
  title: string;
  decs: string;
}

@Component({
  selector: 'app-feature-one',
  imports: [
    CommonModule,
    RouterLink,

  ],
  templateUrl: './feature-one.component.html',
  styleUrl: './feature-one.component.scss'
})
export class FeatureOneComponent {
  featureData:FeatureData[] = featureData
}
