import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SchuelerService } from '../../shared/services/schueler.service';
import { KlassenraumService } from '../../shared/services/klassenraum.service';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { SHARED_IMPORTS, MATERIAL_IMPORTS } from '../../shared/material.imports';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [...SHARED_IMPORTS, ...MATERIAL_IMPORTS, RouterLink],
  template: `
    <section class="overview">
      <div class="hero">
        <div>
          <h1>Dashboard</h1>
          <p>Übersicht aller Kernbereiche der Schulverwaltung.</p>
        </div>
        <div class="hero-actions">
          <a mat-flat-button color="primary" routerLink="/schueler">Schüler verwalten</a>
          <a mat-flat-button color="primary" routerLink="/klassenraeume">Klassenräume</a>
        </div>
      </div>

      <div class="cards">
        <mat-card>
          <mat-card-title>Schüler gesamt</mat-card-title>
          <mat-card-content><span class="value">{{ studentCount }}</span></mat-card-content>
        </mat-card>
        <mat-card>
          <mat-card-title>Klassenräume</mat-card-title>
          <mat-card-content><span class="value">{{ roomCount }}</span></mat-card-content>
        </mat-card>
        <mat-card>
          <mat-card-title>Durchschnittsalter</mat-card-title>
          <mat-card-content>
            <span class="value">{{ averageAge !== null ? averageAge : '-' }}</span>
          </mat-card-content>
        </mat-card>
      </div>
    </section>
  `,
  styles: [
    `
      .overview {
        display: grid;
        gap: 24px;
      }

      .hero {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
      }

      .hero h1 {
        margin: 0;
      }

      .hero-actions a {
        margin-right: 12px;
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
      }

      .value {
        font-size: 2rem;
        font-weight: 700;
      }
    `
  ]
})
export class DashboardComponent implements OnInit {
  studentCount = 0;
  roomCount = 0;
  averageAge: number | null = null;

  constructor(
    private readonly schuelerService: SchuelerService,
    private readonly klassenraumService: KlassenraumService,
    private readonly analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  private loadStatistics(): void {
    this.schuelerService.getAll().subscribe((schueler) => {
      this.studentCount = schueler.length;
    });

    this.klassenraumService.getAll().subscribe((raeume) => {
      this.roomCount = raeume.length;
    });

    this.analyticsService.getDurchschnittsalter().subscribe((value) => {
      this.averageAge = Math.round(value * 10) / 10;
    });
  }
}
