import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movement } from '../../model/movement';
import { Customer } from '../../model/customer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {
  private movementsURL = '/api/customers/';

  constructor(private http: HttpClient) { }

  getMovements(customerId): Observable<Movement[]> {
    return this.http.get<Customer>(this.movementsURL + customerId).pipe(
        map(customer => customer.lastmovements)
    );
  }
}
