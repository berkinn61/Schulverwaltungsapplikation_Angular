import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { KlassenraumService } from '../../shared/services/klassenraum.service';
import { Klassenraum } from '../../shared/models/klassenraum';
import { SHARED_IMPORTS, MATERIAL_IMPORTS } from '../../shared/material.imports';

@Component({
  standalone: true,
  selector: 'app-klassenraum',
  imports: [...SHARED_IMPORTS, ...MATERIAL_IMPORTS, RouterLink],
  template: `
    <section class="list-shell">
      <div class="header-row">
        <div>
          <h1>Klassenräume</h1>
          <p>Verwalten Sie Räume und Kapazitäten.</p>
        </div>
        <a mat-flat-button color="primary" routerLink="/klassenraeume/add">Neuen Raum hinzufügen</a>
      </div>

      <mat-card>
        <div *ngIf="isLoading" class="loading-shell">
          <mat-progress-spinner diameter="40" mode="indeterminate"></mat-progress-spinner>
          <span>Lade Klassenräume …</span>
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
          <ng-container matColumnDef="plaetze">
            <th mat-header-cell *matHeaderCellDef> Plätze </th>
            <td mat-cell *matCellDef="let element"> {{ element.plaetze }} </td>
          </ng-container>
          <ng-container matColumnDef="raumInQm">
            <th mat-header-cell *matHeaderCellDef> Raum (m²) </th>
            <td mat-cell *matCellDef="let element"> {{ element.raumInQm ?? '-' }} </td>
          </ng-container>
          <ng-container matColumnDef="hasCynap">
            <th mat-header-cell *matHeaderCellDef> Cynap </th>
            <td mat-cell *matCellDef="let element"> {{ element.hasCynap ? 'Ja' : 'Nein' }} </td>
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

      table {
        width: 100%;
      }
    `
  ]
})
export class KlassenraumComponent implements OnInit {
  dataSource = new MatTableDataSource<Klassenraum>([]);
  displayedColumns = ['name', 'plaetze', 'raumInQm', 'hasCynap'];
  isLoading = false;
  errorMessage = '';

  constructor(
    private readonly klassenraumService: KlassenraumService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRaeume();
  }

  loadRaeume(): void {
    this.errorMessage = '';
    this.isLoading = true;

    this.klassenraumService.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error?.message || 'Fehler beim Laden der Klassenräume.';
        this.snackBar.open(this.errorMessage, 'Schließen', { duration: 4000 });
      }
    });
  }
}
