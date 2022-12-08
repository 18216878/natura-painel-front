import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorCobrancaComponent } from './simulador-cobranca.component';

describe('SimuladorCobrancaComponent', () => {
  let component: SimuladorCobrancaComponent;
  let fixture: ComponentFixture<SimuladorCobrancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimuladorCobrancaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuladorCobrancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
