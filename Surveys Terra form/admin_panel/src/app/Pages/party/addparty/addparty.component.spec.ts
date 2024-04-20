import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpartyComponent } from './addparty.component';

describe('AddpartyComponent', () => {
  let component: AddpartyComponent;
  let fixture: ComponentFixture<AddpartyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddpartyComponent]
    });
    fixture = TestBed.createComponent(AddpartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
