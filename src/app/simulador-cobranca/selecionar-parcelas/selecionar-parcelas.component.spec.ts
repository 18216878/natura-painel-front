import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarParcelasComponent } from './selecionar-parcelas.component';

describe('SelecionarParcelasComponent', () => {
  let component: SelecionarParcelasComponent;
  let fixture: ComponentFixture<SelecionarParcelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecionarParcelasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecionarParcelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
