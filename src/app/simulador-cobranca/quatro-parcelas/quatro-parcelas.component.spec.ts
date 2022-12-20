import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuatroParcelasComponent } from './quatro-parcelas.component';

describe('QuatroParcelasComponent', () => {
  let component: QuatroParcelasComponent;
  let fixture: ComponentFixture<QuatroParcelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuatroParcelasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuatroParcelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
