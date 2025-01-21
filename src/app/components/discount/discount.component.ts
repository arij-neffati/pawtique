import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-discount',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DiscountComponent implements OnInit, OnDestroy {
  private endDate = new Date('2025-01-31T23:59:59').getTime();
  private timerInterval: any;
  countdown: string = 'Loading...';
  debugInfo: string = '';

  ngOnInit() {
    
    if (isNaN(this.endDate)) {
      console.error('Invalid end date');
      this.countdown = 'Error: Invalid end date';
      return;
    }

    console.log('Component initialized');
    console.log('End date:', new Date(this.endDate));
    
    try {
      this.updateCountdown();
      this.timerInterval = setInterval(() => {
        this.updateCountdown();
      }, 1000);
    } catch (error) {
      console.error('Error in timer setup:', error);
      this.countdown = 'Error: Timer setup failed';
    }
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      console.log('Timer cleared');
    }
  }

  private updateCountdown() {
    try {
      const now = new Date().getTime();
      const timeLeft = this.endDate - now;

      // Add debug information
      this.debugInfo = `Current time: ${new Date(now).toISOString()}\nEnd time: ${new Date(this.endDate).toISOString()}\nTime left: ${timeLeft}ms`;
      console.log(this.debugInfo);

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s remaining`;
      } else {
        this.countdown = 'Discount expired!';
      }
    } catch (error) {
      console.error('Error updating countdown:', error);
      this.countdown = 'Error updating timer';
    }
  }
}