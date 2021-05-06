import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreMatchComponent } from './pre-match.component';

describe('PreMatchComponent', () => {
  let component: PreMatchComponent;
  let fixture: ComponentFixture<PreMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
