import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../../model/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardsURL = '/api/cards/';

  constructor(private http: HttpClient) { }

  getCard(cardId): Observable<Card> {
    return this.http.get<Card>(this.cardsURL + cardId);
  }
}
