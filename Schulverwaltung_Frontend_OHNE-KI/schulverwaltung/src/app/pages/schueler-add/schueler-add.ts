import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { SchuelerService } from '../../services/schueler.service';

@Component({
  selector: 'app-schueler-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './schueler-add.html',
  styleUrl: './schueler-add.css'
})
export class SchuelerAddComponent {

  name = '';
  klasse = '';
  geschlecht = '';
  geburtstag = '';

  private schuelerService = inject(SchuelerService);

  schuelerHinzufuegen(): void {

    const neuerSchueler = {
      id: 0,
      name: this.name,
      klasse: this.klasse,
      geschlecht: this.geschlecht,
      geburtstag: this.geburtstag,
      alter: 0
    };

    this.schuelerService.addSchueler(neuerSchueler).subscribe({
      next: () => {

        alert('Schüler erfolgreich hinzugefügt!');

        this.name = '';
        this.klasse = '';
        this.geschlecht = '';
        this.geburtstag = '';
      },

      error: (fehler) => {
        console.error(fehler);
        alert('Fehler beim Hinzufügen!');
      }
    });

  }

}