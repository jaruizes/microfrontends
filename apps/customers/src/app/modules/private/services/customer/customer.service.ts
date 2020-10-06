import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  getCustomer() {
    return "0001";
  }
}
