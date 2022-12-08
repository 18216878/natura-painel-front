import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicsHistoricoComponent } from './dynamics-historico.component';

describe('DynamicsHistoricoComponent', () => {
  let component: DynamicsHistoricoComponent;
  let fixture: ComponentFixture<DynamicsHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicsHistoricoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicsHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
