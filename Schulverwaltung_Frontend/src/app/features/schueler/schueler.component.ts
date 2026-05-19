import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { SchuelerService } from '../../shared/services/schueler.service';
import { Schueler } from '../../shared/models/schueler';
import { SHARED_IMPORTS, MATERIAL_IMPORTS } from '../../shared/material.imports';

@Component({
  standalone: true,
  selector: 'app-schueler',
  imports: [...SHARED_IMPORTS, ...MATERIAL_IMPORTS, RouterLink],
  template: `
    <section class="list-shell">
      <div class="header-row">
        <div>
          <h1>Schüler</h1>
          <p>Filtern und prüfen Sie Schülerdaten nach Klassen.</p>
        </div>
        <a mat-flat-button color="primary" routerLink="/schueler/add">Neuen Schüler hinzufügen</a>
      </div>

      <mat-card class="filter-card">
        <div class="filter-row">
          <mat-form-field appearance="outline">
            <mat-label>Klasse filtern</mat-label>
            <mat-select [formControl]="klasseControl" (selectionChange)="onFilterChange()">
              <mat-option value="">Alle Klassen</mat-option>
              <mat-option *ngFor="let klasse of klassen" [value]="klasse">{{ klasse }}</mat-option>
            </mat-select>
          </mat-form-field>
          <button mat-stroked-button color="primary" type="button" (click)="loadSchueler()">Aktualisieren</button>
        </div>
      </mat-card>

      <mat-card>
        <div *ngIf="isLoading" class="loading-shell">
          <mat-progress-spinner diameter="40" mode="indeterminate"></mat-progress-spinner>
          <span>Lade Schülerdaten …</span>
        </div>

        <div *ngIf="errorMessage" class="error-shell">
          <mat-icon>error</mat-icon>
          <span>{{ errorMessage }}</span>
        </div>

        <table mat-table [dataSource]="dataSource" class="mat-elevation-z1" *ngIf="!isLoading && !errorMessage">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef> Name </th>
            <td mat-cell *matCellDef="let element"> {{ element.name }} </td>
          </ng-container>
          <ng-container matColumnDef="klasse">
            <th mat-header-cell *matHeaderCellDef> Klasse </th>
            <td mat-cell *matCellDef="let element"> {{ element.klasse }} </td>
          </ng-container>
          <ng-container matColumnDef="geburtstag">
            <th mat-header-cell *matHeaderCellDef> Geburtstag </th>
            <td mat-cell *matCellDef="let element"> {{ element.geburtstag || '-' }} </td>
          </ng-container>
          <ng-container matColumnDef="geschlecht">
            <th mat-header-cell *matHeaderCellDef> Geschlecht </th>
            <td mat-cell *matCellDef="let element"> {{ element.geschlecht || '-' }} </td>
          </ng-container>
          <ng-container matColumnDef="alter">
            <th mat-header-cell *matHeaderCellDef> Alter </th>
            <td mat-cell *matCellDef="let element"> {{ element.alter ?? '-' }} </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .list-shell {
        display: grid;
        gap: 20px;
      }

      .header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
      }

      .filter-card {
        padding: 16px;
      }

      .filter-row {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        align-items: center;
      }

      table {
        width: 100%;
      }
    `
  ]
})
export class SchuelerComponent implements OnInit {
  schueler: Schueler[] = [];
  dataSource = new MatTableDataSource<Schueler>([]);
  klassen: string[] = [];
  klasseControl = new FormControl('');
  displayedColumns = ['name', 'klasse', 'geburtstag', 'geschlecht', 'alter'];
  isLoading = false;
  errorMessage = '';

  constructor(private readonly schuelerService: SchuelerService, private readonly snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadSchueler();
  }

  loadSchueler(): void {
    this.errorMessage = '';
    this.isLoading = true;
    const klasse = this.klasseControl.value;
    const fetch = klasse ? this.schuelerService.getByKlasse(klasse) : this.schuelerService.getAll();

    fetch.subscribe({
      next: (data) => {
        this.schueler = data;
        this.dataSource.data = data;
        this.klassen = Array.from(new Set(data.map((item) => item.klasse).filter(Boolean)));
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error?.message || 'Fehler beim Laden der Schülerdaten.';
        this.snackBar.open(this.errorMessage, 'Schließen', { duration: 4000 });
      }
    });
  }

  onFilterChange(): void {
    this.loadSchueler();
  }
}
