import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { faCloud, faCubes, faBlog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  public env: string;
  faCloud = faCloud;
  faCubes = faCubes;
  faBlog = faBlog;

  constructor(private router: Router) {
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
