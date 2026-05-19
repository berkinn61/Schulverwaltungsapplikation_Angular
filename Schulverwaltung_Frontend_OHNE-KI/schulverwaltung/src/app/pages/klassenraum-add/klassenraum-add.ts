import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { KlassenraumService } from '../../services/klassenraum.service';

@Component({
  selector: 'app-klassenraum-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './klassenraum-add.html',
  styleUrl: './klassenraum-add.css'
})
export class KlassenraumAddComponent {

  name = '';

  raumInQm = 0;

  plaetze = 0;

  hasCynap = false;

  private klassenraumService = inject(KlassenraumService);

  klassenraumHinzufuegen(): void {

    const neuerRaum = {
      id: 0,
      name: this.name,
      raumInQm: this.raumInQm,
      plaetze: this.plaetze,
      hasCynap: this.hasCynap
    };

    this.klassenraumService.addKlassenraum(neuerRaum).subscribe({
      next: () => {

        alert('Klassenraum hinzugefügt!');

        this.name = '';
        this.raumInQm = 0;
        this.plaetze = 0;
        this.hasCynap = false;
      },

      error: (fehler) => {
        console.error(fehler);
      }
    });

  }

}