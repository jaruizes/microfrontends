import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalPositionComponent } from './global-position.component';

describe('GlobalPositionComponent', () => {
  let component: GlobalPositionComponent;
  let fixture: ComponentFixture<GlobalPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
