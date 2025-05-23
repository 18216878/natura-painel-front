import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDefeitoComponent } from './tipo-defeito.component';

describe('TipoDefeitoComponent', () => {
  let component: TipoDefeitoComponent;
  let fixture: ComponentFixture<TipoDefeitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoDefeitoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoDefeitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
