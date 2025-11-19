import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-maintenance',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss'
})
export class MaintenanceComponent {
  minutes:number = 0;
  remainingSeconds:number = 0;
  seconds:number=3599;
  intervalId:any = 0

  ngAfterViewInit() {
    
    this.intervalId = setInterval(() => {
        this.calculateTimeRemaining()
    }, 1000);
  }
  calculateTimeRemaining() {
      this.minutes = Math.round((this.seconds - 30) / 60);
      console.log(this.minutes);
      
      this.remainingSeconds = this.seconds % 60;
      if (this.seconds === 0) {
          clearInterval(this.intervalId);
      } else {
          this.seconds = this.seconds - 1;
      }
  }
}
