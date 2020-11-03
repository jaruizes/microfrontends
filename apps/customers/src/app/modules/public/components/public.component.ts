import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
//import { defineCustomElements as p1} from '@jaruizes/product-item/dist/loader';
//import { ProductItem } from '@jaruizes/product-item/dist/v1/collection/components/product-item/product-item';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  public env: string;

  constructor(private router: Router) {
    //p1();
    //new ProductItem();
    this.env = environment.env;
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
