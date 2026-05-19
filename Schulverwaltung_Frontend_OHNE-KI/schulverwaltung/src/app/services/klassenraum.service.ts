import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Klassenraum } from '../models/klassenraum';

@Injectable({
  providedIn: 'root'
})
export class KlassenraumService {

  private apiUrl = 'http://localhost:5208/api/klassenraum';

  private http = inject(HttpClient);

  getAllKlassenraeume(): Observable<Klassenraum[]> {

    return this.http.get<Klassenraum[]>(`${this.apiUrl}/all`);

  }

  addKlassenraum(klassenraum: Klassenraum): Observable<any> {

    return this.http.post(`${this.apiUrl}/add`, klassenraum);

  }

}