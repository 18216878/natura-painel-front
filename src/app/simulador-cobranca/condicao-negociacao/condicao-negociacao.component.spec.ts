import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicaoNegociacaoComponent } from './condicao-negociacao.component';

describe('CondicaoNegociacaoComponent', () => {
  let component: CondicaoNegociacaoComponent;
  let fixture: ComponentFixture<CondicaoNegociacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondicaoNegociacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CondicaoNegociacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
