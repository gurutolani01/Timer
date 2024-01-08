import { Component } from '@angular/core';
import { Subscription, interval, timer } from 'rxjs';

@Component({
  selector: 'app-timer-component',
  templateUrl: './timer-component.component.html',
  styleUrl: './timer-component.component.css'
})
export class TimerComponentComponent {
  timerRunning = false;
  timerPaused = false;
  displayTime = '05:00';
  timerSubscription!: Subscription;

  ngOnInit() {
    this.resetTimer();
  }

  startTimer() {
    this.timerRunning = true;
    this.timerSubscription = interval(1000).subscribe(() => {
      this.updateTimer();
    });
  }

  resetTimer() {
    this.timerRunning = false;
    this.timerPaused = false;
    this.displayTime = '05:00';
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  pauseTimer() {
    this.timerRunning = false;
    this.timerPaused = true;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  resumeTimer() {
    this.timerRunning = true;
    this.timerPaused = false;
    this.timerSubscription = interval(1000).subscribe(() => {
      this.updateTimer();
    });
  }

  private updateTimer() {
    const timeParts = this.displayTime.split(':');
    let minutes = parseInt(timeParts[0], 10);
    let seconds = parseInt(timeParts[1], 10);

    if (minutes === 0 && seconds === 0) {
      this.resetTimer();
    } else {
      if (seconds === 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      this.displayTime = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
    }
  }

  private formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

}
  
  


