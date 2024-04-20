import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpartyComponent } from './editparty.component';

describe('EditpartyComponent', () => {
  let component: EditpartyComponent;
  let fixture: ComponentFixture<EditpartyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditpartyComponent]
    });
    fixture = TestBed.createComponent(EditpartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
