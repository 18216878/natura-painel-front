import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoBTrocasComponent } from './plano-b-trocas.component';

describe('PlanoBTrocasComponent', () => {
  let component: PlanoBTrocasComponent;
  let fixture: ComponentFixture<PlanoBTrocasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanoBTrocasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanoBTrocasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
