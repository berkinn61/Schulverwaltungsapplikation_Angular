import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { apiConfig } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly url = `${apiConfig.baseUrl}/schule/analytics`;

  constructor(private readonly http: HttpClient) {}

  getDurchschnittsalter(): Observable<number> {
    return this.http
      .get<number>(`${this.url}/durchschnittsalter`)
      .pipe(catchError(this.handleError));
  }

  getFrauenanteil(klasse: string): Observable<number> {
    return this.http
      .get<number>(`${this.url}/frauenanteil/${encodeURIComponent(klasse)}`)
      .pipe(catchError(this.handleError));
  }

  kannUnterrichten(klasse: string, raumName: string): Observable<string> {
    return this.http
      .get(`${this.url}/kannUnterrichten/${encodeURIComponent(klasse)}/${encodeURIComponent(raumName)}`, {
        responseType: 'text'
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.toString() || error.message || 'Ein unbekannter Fehler ist aufgetreten.';
    return throwError(() => new Error(message));
  }
}
