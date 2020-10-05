import { Injectable } from '@angular/core';
import { Account } from '../model/account';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private accountsURL = '/api/accounts';

  constructor(private http: HttpClient) { }

  getAccounts(customer): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountsURL + '?customer=' + customer)
  }
}
