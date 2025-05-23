import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SondagemDirecionadoraComponent } from './sondagem-direcionadora.component';

describe('SondagemDirecionadoraComponent', () => {
  let component: SondagemDirecionadoraComponent;
  let fixture: ComponentFixture<SondagemDirecionadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SondagemDirecionadoraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SondagemDirecionadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
