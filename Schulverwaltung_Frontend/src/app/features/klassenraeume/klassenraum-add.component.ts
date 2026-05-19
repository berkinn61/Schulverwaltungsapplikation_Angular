import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SHARED_IMPORTS, MATERIAL_IMPORTS } from '../../shared/material.imports';
import { Klassenraum } from '../../shared/models/klassenraum';
import { KlassenraumService } from '../../shared/services/klassenraum.service';

@Component({
  standalone: true,
  selector: 'app-klassenraum-add',
  imports: [...SHARED_IMPORTS, ...MATERIAL_IMPORTS],
  template: `
    <section class="form-shell">
      <div class="header-row">
        <div>
          <h1>Klassenraum hinzufügen</h1>
          <p>Erfassen Sie Raumdaten mit Platzangebot.</p>
        </div>
      </div>

      <mat-card>
        <form [formGroup]="raumForm" (ngSubmit)="submit()" class="form-grid">
          <mat-form-field appearance="outline">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Plätze</mat-label>
            <input matInput type="number" formControlName="plaetze" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Raum in m²</mat-label>
            <input matInput type="number" formControlName="raumInQm" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Cynap vorhanden</mat-label>
            <mat-select formControlName="hasCynap">
              <mat-option [value]="true">Ja</mat-option>
              <mat-option [value]="false">Nein</mat-option>
            </mat-select>
          </mat-form-field>

          <div class="form-actions">
            <button mat-stroked-button type="button" color="primary" (click)="cancel()">Abbrechen</button>
            <button mat-flat-button color="primary" type="submit" [disabled]="raumForm.invalid">Speichern</button>
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
export class KlassenraumAddComponent {
  raumForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly klassenraumService: KlassenraumService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {
    this.raumForm = this.formBuilder.group({
      name: ['', Validators.required],
      plaetze: [0, [Validators.required, Validators.min(1)]],
      raumInQm: [0],
      hasCynap: [false]
    });
  }

  submit(): void {
    if (this.raumForm.invalid) {
      return;
    }

    const payload = this.raumForm.value as Klassenraum;

    this.klassenraumService.addKlassenraum(payload).subscribe({
      next: () => {
        this.snackBar.open('Klassenraum erfolgreich hinzugefügt.', 'OK', { duration: 3000 });
        this.router.navigate(['/klassenraeume']);
      },
      error: (error) => {
        const message = error?.message || 'Fehler beim Hinzufügen des Klassenraums.';
        this.snackBar.open(message, 'OK', { duration: 4000 });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/klassenraeume']);
  }
}
