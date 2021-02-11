import { Injectable } from '@angular/core';
import { Account } from '../../model/account';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private accountURL = '/api/accounts/';

  constructor(private http: HttpClient) { }

  getAccount(accountId): Observable<Account> {
    return this.http.get<Account>(this.accountURL + accountId)
  }
}
