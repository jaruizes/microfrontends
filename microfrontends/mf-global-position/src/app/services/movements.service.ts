import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movement } from '../model/movement';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {
  private movementsURL = '/api/movements';

  constructor(private http: HttpClient) { }

  getMovements(): Observable<Movement[]> {
    return this.http.get<Movement[]>(this.movementsURL)
  }
}
