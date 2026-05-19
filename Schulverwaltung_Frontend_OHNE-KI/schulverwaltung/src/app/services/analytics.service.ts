import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private apiUrl = 'http://localhost:5208/api/schule/analytics';

  private http = inject(HttpClient);

  getDurchschnittsalter(): Observable<number> {

    return this.http.get<number>(
      `${this.apiUrl}/durchschnittsalter`
    );

  }

  getFrauenanteil(klasse: string): Observable<number> {

    return this.http.get<number>(
      `${this.apiUrl}/frauenanteil/${klasse}`
    );

  }

  kannUnterrichten(
    klasse: string,
    raumName: string
  ): Observable<string> {

    return this.http.get(
      `${this.apiUrl}/kannUnterrichten/${klasse}/${raumName}`,
      {
        responseType: 'text'
      }
    );

  }

}