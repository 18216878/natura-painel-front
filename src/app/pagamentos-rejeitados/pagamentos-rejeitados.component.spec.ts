import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentosRejeitadosComponent } from './pagamentos-rejeitados.component';

describe('PagamentosRejeitadosComponent', () => {
  let component: PagamentosRejeitadosComponent;
  let fixture: ComponentFixture<PagamentosRejeitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagamentosRejeitadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagamentosRejeitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
