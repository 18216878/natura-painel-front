import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CincoParcelasComponent } from './cinco-parcelas.component';

describe('CincoParcelasComponent', () => {
  let component: CincoParcelasComponent;
  let fixture: ComponentFixture<CincoParcelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CincoParcelasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CincoParcelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
