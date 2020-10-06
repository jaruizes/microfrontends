import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateHomeComponent } from './main.component';

describe('MainComponent', () => {
  let component: PrivateHomeComponent;
  let fixture: ComponentFixture<PrivateHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
