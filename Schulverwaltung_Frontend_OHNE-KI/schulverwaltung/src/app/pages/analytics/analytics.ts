import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css'
})
export class AnalyticsComponent {

  durchschnittsalter = 0;

  frauenanteil = 0;

  kannUnterrichtenErgebnis = '';

  klasseFrauenanteil = '';

  klasseUnterricht = '';

  raumUnterricht = '';

  private analyticsService = inject(AnalyticsService);

  ladeDurchschnittsalter(): void {

    this.analyticsService.getDurchschnittsalter().subscribe({
      next: (daten) => {
        this.durchschnittsalter = daten;
      }
    });

  }

  berechneFrauenanteil(): void {

    this.analyticsService
      .getFrauenanteil(this.klasseFrauenanteil)
      .subscribe({

        next: (daten) => {
          this.frauenanteil = daten;
        }

      });

  }

  pruefeUnterricht(): void {

    this.analyticsService
      .kannUnterrichten(
        this.klasseUnterricht,
        this.raumUnterricht
      )
      .subscribe({

        next: (daten) => {
          this.kannUnterrichtenErgebnis = daten;
        }

      });

  }

}