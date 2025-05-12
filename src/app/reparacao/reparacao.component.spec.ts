import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparacaoComponent } from './reparacao.component';

describe('ReparacaoComponent', () => {
  let component: ReparacaoComponent;
  let fixture: ComponentFixture<ReparacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReparacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
