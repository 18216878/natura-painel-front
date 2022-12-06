import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessFormDialogComponent } from './success-form-dialog.component';

describe('SuccessFormDialogComponent', () => {
  let component: SuccessFormDialogComponent;
  let fixture: ComponentFixture<SuccessFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
