import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleticsComponent } from './athletics.component';

describe('AthleticsComponent', () => {
  let component: AthleticsComponent;
  let fixture: ComponentFixture<AthleticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AthleticsComponent]
    });
    fixture = TestBed.createComponent(AthleticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
