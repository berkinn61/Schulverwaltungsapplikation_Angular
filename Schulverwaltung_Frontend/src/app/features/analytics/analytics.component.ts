import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SHARED_IMPORTS, MATERIAL_IMPORTS } from '../../shared/material.imports';
import { AnalyticsService } from '../../shared/services/analytics.service';

@Component({
  standalone: true,
  selector: 'app-analytics',
  imports: [...SHARED_IMPORTS, ...MATERIAL_IMPORTS],
  template: `
    <section class="analytics-shell">
      <div class="header-row">
        <div>
          <h1>Analytics</h1>
          <p>Einfaches Monitoring für Altersdurchschnitt, Frauenanteil und Raumprüfung.</p>
        </div>
      </div>

      <mat-card>
        <form [formGroup]="analyticsForm" class="analytics-grid" (ngSubmit)="refresh()">
          <mat-form-field appearance="outline">
            <mat-label>Klasse</mat-label>
            <input matInput formControlName="klasse" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Raumname</mat-label>
            <input matInput formControlName="raumName" />
          </mat-form-field>

          <div class="button-row">
            <button mat-flat-button color="primary" type="submit" [disabled]="analyticsForm.invalid || isLoading">Analyse starten</button>
          </div>
        </form>
      </mat-card>

      <mat-card *ngIf="errorMessage" class="error-card">
        <mat-card-content>
          <mat-icon color="warn">error</mat-icon>
          <span>{{ errorMessage }}</span>
        </mat-card-content>
      </mat-card>

      <div class="result-grid">
        <mat-card>
          <mat-card-title>Durchschnittsalter</mat-card-title>
          <mat-card-content>
            <span class="value">{{ durchschnittsalter !== null ? durchschnittsalter : '-' }}</span>
          </mat-card-content>
        </mat-card>
        <mat-card>
          <mat-card-title>Frauenanteil</mat-card-title>
          <mat-card-content>
            <span class="value">{{ frauenanteil !== null ? frauenanteil + '%' : '-' }}</span>
          </mat-card-content>
        </mat-card>
        <mat-card>
          <mat-card-title>Raumprüfung</mat-card-title>
          <mat-card-content>
            <span class="value">{{ raumPruefung || 'Bitte Klasse und Raum wählen' }}</span>
          </mat-card-content>
        </mat-card>
      </div>
    </section>
  `,
  styles: [
    `
      .analytics-shell {
        display: grid;
        gap: 20px;
      }

      .header-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .analytics-grid {
        display: grid;
        gap: 16px;
      }

      .button-row {
        display: flex;
        justify-content: flex-start;
      }

      .result-grid {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }

      .value {
        font-size: 1.8rem;
        font-weight: 700;
      }
    `
  ]
})
export class AnalyticsComponent {
  durchschnittsalter: number | null = null;
  frauenanteil: number | null = null;
  raumPruefung = '';
  analyticsForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly analyticsService: AnalyticsService,
    private readonly snackBar: MatSnackBar
  ) {
    this.analyticsForm = this.formBuilder.group({
      klasse: ['', Validators.required],
      raumName: ['', Validators.required]
    });
  }

  refresh(): void {
    if (this.analyticsForm.invalid) {
      return;
    }

    const { klasse, raumName } = this.analyticsForm.value as { klasse: string; raumName: string };
    this.isLoading = true;
    this.errorMessage = '';
    this.durchschnittsalter = null;
    this.frauenanteil = null;
    this.raumPruefung = '';

    this.analyticsService.getDurchschnittsalter().subscribe({
      next: (value) => {
        this.durchschnittsalter = Math.round(value * 10) / 10;
      },
      error: (error) => this.handleError(error)
    });

    this.analyticsService.getFrauenanteil(klasse).subscribe({
      next: (value) => {
        this.frauenanteil = Math.round(value * 10) / 10;
      },
      error: (error) => this.handleError(error)
    });

    this.analyticsService.kannUnterrichten(klasse, raumName).subscribe({
      next: (message) => {
        this.raumPruefung = message;
      },
      error: (error) => this.handleError(error)
    }).add(() => {
      this.isLoading = false;
    });
  }

  private handleError(error: unknown) {
    this.isLoading = false;
    const message = error instanceof Error ? error.message : 'Fehler beim Abruf der Analytics-Daten.';
    this.errorMessage = message;
    this.snackBar.open(message, 'Schließen', { duration: 4000 });
  }
}
