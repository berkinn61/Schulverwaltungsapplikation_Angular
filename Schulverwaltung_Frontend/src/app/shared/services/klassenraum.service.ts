import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { apiConfig } from '../api.config';
import { Klassenraum } from '../models/klassenraum';

@Injectable({
  providedIn: 'root'
})
export class KlassenraumService {
  private readonly url = `${apiConfig.baseUrl}/klassenraum`;

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Klassenraum[]> {
    return this.http.get<Klassenraum[]>(`${this.url}/all`).pipe(catchError(this.handleError));
  }

  addKlassenraum(klassenraum: Klassenraum): Observable<string> {
    return this.http
      .post(`${this.url}/add`, klassenraum, {
        responseType: 'text'
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.toString() || error.message || 'Fehler bei der Klassenraum-API.';
    return throwError(() => new Error(message));
  }
}
