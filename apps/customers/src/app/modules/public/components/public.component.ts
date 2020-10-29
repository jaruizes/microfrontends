import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { defineCustomElements as p1} from '@jaruizes/product-item/dist/loader';
//import { ProductItem } from '@jaruizes/product-item/dist/v1/collection/components/product-item/product-item';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  constructor(private router: Router) {
    p1();
    //new ProductItem();
  }

  ngOnInit() {
  }

  doLogin() {
    this.router.navigate(['/login', { doLogin: 'true' }]);
  }

  goToDoc() {
    this.router.navigate(['/doc']);
  }

}
