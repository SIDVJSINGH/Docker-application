import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcmsComponent } from './dialogcms.component';

describe('DialogcmsComponent', () => {
  let component: DialogcmsComponent;
  let fixture: ComponentFixture<DialogcmsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogcmsComponent]
    });
    fixture = TestBed.createComponent(DialogcmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
