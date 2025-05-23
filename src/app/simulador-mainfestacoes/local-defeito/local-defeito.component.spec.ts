import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalDefeitoComponent } from './local-defeito.component';

describe('LocalDefeitoComponent', () => {
  let component: LocalDefeitoComponent;
  let fixture: ComponentFixture<LocalDefeitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalDefeitoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalDefeitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
