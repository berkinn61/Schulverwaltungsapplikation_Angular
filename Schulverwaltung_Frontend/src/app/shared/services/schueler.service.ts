import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { apiConfig } from '../api.config';
import { Schueler } from '../models/schueler';

@Injectable({
  providedIn: 'root'
})
export class SchuelerService {
  private readonly url = `${apiConfig.baseUrl}/schueler`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Schueler[]> {
    return this.http.get<Schueler[]>(`${this.url}/all`).pipe(catchError(this.handleError));
  }

  getByKlasse(klasse: string): Observable<Schueler[]> {
    return this.http
      .get<Schueler[]>(`${this.url}/byKlasse/${encodeURIComponent(klasse)}`)
      .pipe(catchError(this.handleError));
  }

  addSchueler(schueler: Schueler): Observable<string> {
    return this.http
      .post(`${this.url}/add`, schueler, {
        responseType: 'text'
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.toString() || error.message || 'Unbekannter Fehler beim Laden der Schülerdaten.';
    return throwError(() => new Error(message));
  }
}
