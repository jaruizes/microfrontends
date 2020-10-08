import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;

  constructor() {
  }

  initUser() {
    const token = sessionStorage.getItem('id_token');
    if (token) {
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
    }
  }

  getUser() {
    return this.user;
  }
}
