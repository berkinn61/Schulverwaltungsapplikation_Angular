import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SHARED_IMPORTS, MATERIAL_IMPORTS } from '../../shared/material.imports';
import { Schueler } from '../../shared/models/schueler';
import { SchuelerService } from '../../shared/services/schueler.service';

@Component({
  standalone: true,
  selector: 'app-schueler-add',
  imports: [...SHARED_IMPORTS, ...MATERIAL_IMPORTS],
  template: `
    <section class="form-shell">
      <div class="header-row">
        <div>
          <h1>Schüler hinzufügen</h1>
          <p>Neue Schülerdaten können hier erfasst werden.</p>
        </div>
      </div>

      <mat-card>
        <form [formGroup]="schuelerForm" (ngSubmit)="submit()" class="form-grid">
          <mat-form-field appearance="outline">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Klasse</mat-label>
            <input matInput formControlName="klasse" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Geburtstag</mat-label>
            <input matInput type="date" formControlName="geburtstag" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Geschlecht</mat-label>
            <mat-select formControlName="geschlecht">
              <mat-option value="weiblich">weiblich</mat-option>
              <mat-option value="männlich">männlich</mat-option>
              <mat-option value="unbekannt">unbekannt</mat-option>
            </mat-select>
          </mat-form-field>

          <div class="form-actions">
            <button mat-stroked-button type="button" color="primary" (click)="cancel()">Abbrechen</button>
            <button mat-flat-button color="primary" type="submit" [disabled]="schuelerForm.invalid">Speichern</button>
          </div>
        </form>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .form-shell {
        display: grid;
        gap: 20px;
      }

      .form-grid {
        display: grid;
        gap: 16px;
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        margin-top: 8px;
      }
    `
  ]
})
export class SchuelerAddComponent {
  schuelerForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly schuelerService: SchuelerService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {
    this.schuelerForm = this.formBuilder.group({
      name: ['', Validators.required],
      klasse: ['', Validators.required],
      geburtstag: ['', Validators.required],
      geschlecht: ['weiblich', Validators.required]
    });
  }

  submit(): void {
    if (this.schuelerForm.invalid) {
      return;
    }

    const payload = this.schuelerForm.value as Schueler;

    this.schuelerService.addSchueler(payload).subscribe({
      next: () => {
        this.snackBar.open('Schüler erfolgreich hinzugefügt.', 'OK', { duration: 3000 });
        this.router.navigate(['/schueler']);
      },
      error: () => {
        this.snackBar.open('Fehler beim Hinzufügen des Schülers.', 'OK', { duration: 4000 });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/schueler']);
  }
}
