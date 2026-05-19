import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchuelerService } from '../../services/schueler.service';

import { Schueler } from '../../models/schueler';

@Component({
  selector: 'app-schueler-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schueler-list.html',
  styleUrl: './schueler-list.css'
})
export class SchuelerListComponent implements OnInit {

  schuelerListe: Schueler[] = [];

  private schuelerService = inject(SchuelerService);

  ngOnInit(): void {

    this.schuelerService.getAllSchueler().subscribe({
      next: (daten) => {
        this.schuelerListe = daten;
      },

      error: (fehler) => {
        console.error('Fehler beim Laden:', fehler);
      }
    });

  }

}