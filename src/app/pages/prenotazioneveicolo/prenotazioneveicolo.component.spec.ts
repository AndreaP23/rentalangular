import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotazioneveicoloComponent } from './prenotazioneveicolo.component';

describe('PrenotazioneveicoloComponent', () => {
  let component: PrenotazioneveicoloComponent;
  let fixture: ComponentFixture<PrenotazioneveicoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrenotazioneveicoloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrenotazioneveicoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
