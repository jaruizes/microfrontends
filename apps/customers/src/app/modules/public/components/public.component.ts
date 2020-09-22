import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  public elementUrl: string = '/mfs-home/main.js';
  //private loaded: boolean;

  constructor(private router: Router, private  ngZone: NgZone) {
    //this.loaded = false;
    const channel = new BroadcastChannel("mfs-channel");
    channel.onmessage = (e) => {
      if (e.data.type === 'login') {
        this.ngZone.run(() => {
          this.router.navigate(['/login']);
        });
      }
    };
    console.log(this.router);
  }


  ngOnInit() {
  }

  /*load(): void {
    if (this.loaded) return;
    const script = document.createElement('script');
    script.src = '/mfs-home/main.js';
    document.body.appendChild(script);
    this.loaded = true;
  }*/

}
