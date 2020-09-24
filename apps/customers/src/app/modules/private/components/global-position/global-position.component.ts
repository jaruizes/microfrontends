import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-position',
  templateUrl: './global-position.component.html',
  styleUrls: ['./global-position.component.css']
})
export class GlobalPositionComponent implements OnInit {
  public globalPositionURL = '/mf-global-position/main.js';

  constructor() { }

  ngOnInit(): void {
  }

}
