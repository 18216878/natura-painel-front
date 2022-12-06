import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrosIrregularesComponent } from './cadastros-irregulares.component';

describe('CadastrosIrregularesComponent', () => {
  let component: CadastrosIrregularesComponent;
  let fixture: ComponentFixture<CadastrosIrregularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrosIrregularesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrosIrregularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
