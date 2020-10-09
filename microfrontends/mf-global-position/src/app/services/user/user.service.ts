import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../model/user';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;

  constructor() {
  }

  getUser(): Observable<User> {
    const token = sessionStorage.getItem('id_token');
    if (!token) {
      return throwError('User not initialized');
    }

    const helper = new JwtHelperService();
    const tokenDecoded = helper.decodeToken(token);
    this.user = {
      name: tokenDecoded['name'],
      nickname: tokenDecoded['nickname'],
      email: tokenDecoded['email']
    };

    console.log('------------------');
    console.log(this.user);
    console.log('------------------');

    return of(this.user);
  }
}
