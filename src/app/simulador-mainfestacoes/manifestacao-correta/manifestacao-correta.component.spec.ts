import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestacaoCorretaComponent } from './manifestacao-correta.component';

describe('ManifestacaoCorretaComponent', () => {
  let component: ManifestacaoCorretaComponent;
  let fixture: ComponentFixture<ManifestacaoCorretaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManifestacaoCorretaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManifestacaoCorretaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
