import { Injectable } from '@angular/core';
import { Card } from '../model/card';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private cardsURL = '/api/cards';

  constructor(private http: HttpClient) { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsURL)
  }
}
