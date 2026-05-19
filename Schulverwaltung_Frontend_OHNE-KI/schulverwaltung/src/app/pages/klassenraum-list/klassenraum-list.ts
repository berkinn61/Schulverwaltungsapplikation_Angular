import { Component, inject, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { KlassenraumService } from '../../services/klassenraum.service';

import { Klassenraum } from '../../models/klassenraum';

@Component({
  selector: 'app-klassenraum-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './klassenraum-list.html',
  styleUrl: './klassenraum-list.css'
})
export class KlassenraumListComponent implements OnInit {

  klassenraeume: Klassenraum[] = [];

  private klassenraumService = inject(KlassenraumService);

  ngOnInit(): void {

    this.klassenraumService.getAllKlassenraeume().subscribe({
      next: (daten) => {
        this.klassenraeume = daten;
      },

      error: (fehler) => {
        console.error(fehler);
      }
    });

  }

}