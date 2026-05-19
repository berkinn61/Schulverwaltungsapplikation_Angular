import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Schueler } from '../models/schueler';

@Injectable({
  providedIn: 'root'
})
export class SchuelerService {

  private apiUrl = 'http://localhost:5208/api/schueler';

  private http = inject(HttpClient);

  getAllSchueler(): Observable<Schueler[]> {
    return this.http.get<Schueler[]>(`${this.apiUrl}/all`);
  }

  addSchueler(schueler: Schueler): Observable<any> {
  return this.http.post(`${this.apiUrl}/add`, schueler);
}

}