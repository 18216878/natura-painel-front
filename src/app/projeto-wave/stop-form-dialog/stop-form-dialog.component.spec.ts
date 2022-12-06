import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopFormDialogComponent } from './stop-form-dialog.component';

describe('StopFormDialogComponent', () => {
  let component: StopFormDialogComponent;
  let fixture: ComponentFixture<StopFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
