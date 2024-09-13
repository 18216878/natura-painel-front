import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoVendaComponent } from './codigo-venda.component';

describe('CodigoVendaComponent', () => {
  let component: CodigoVendaComponent;
  let fixture: ComponentFixture<CodigoVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodigoVendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodigoVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
