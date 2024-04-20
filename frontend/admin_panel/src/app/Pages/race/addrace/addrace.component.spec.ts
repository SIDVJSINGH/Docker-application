import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddraceComponent } from './addrace.component';

describe('AddraceComponent', () => {
  let component: AddraceComponent;
  let fixture: ComponentFixture<AddraceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddraceComponent]
    });
    fixture = TestBed.createComponent(AddraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
