import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-overlay" [class.inline]="mode === 'inline'">
      <div class="spinner-container">
        <div class="spinner-ring">
          <div class="ring r1"></div>
          <div class="ring r2"></div>
          <div class="ring r3"></div>
          <div class="spinner-logo">P</div>
        </div>
        <p class="spinner-text" *ngIf="message">{{ message }}</p>
      </div>
    </div>
  `,
  styles: [`
    .spinner-overlay {
      position: fixed;
      inset: 0;
      background: rgba(5, 13, 36, 0.65);
      backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;

      &.inline {
        position: relative;
        background: transparent;
        backdrop-filter: none;
        min-height: 120px;
      }
    }

    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
    }

    .spinner-ring {
      position: relative;
      width: 72px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 3px solid transparent;
    }

    .r1 {
      border-top-color: #2563eb;
      animation: spin 1s linear infinite;
    }

    .r2 {
      inset: 6px;
      border-right-color: #06b6d4;
      animation: spin 1.4s linear infinite reverse;
    }

    .r3 {
      inset: 12px;
      border-bottom-color: #7c3aed;
      animation: spin 0.8s linear infinite;
    }

    .spinner-logo {
      font-family: 'Bricolage Grotesque', sans-serif;
      font-size: 22px;
      font-weight: 800;
      background: linear-gradient(135deg, #2563eb, #06b6d4, #7c3aed);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: pulse 1.5s ease-in-out infinite;
    }

    .spinner-text {
      font-family: 'Instrument Sans', sans-serif;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.85);
      letter-spacing: 0.3px;
      animation: fadeInOut 1.8s ease-in-out infinite;

      .inline & {
        color: #64748b;
      }
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(0.92); }
    }

    @keyframes fadeInOut {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
  `]
})
export class SpinnerComponent {
  @Input() message = 'Cargando...';
  @Input() mode: 'overlay' | 'inline' = 'overlay';
}
