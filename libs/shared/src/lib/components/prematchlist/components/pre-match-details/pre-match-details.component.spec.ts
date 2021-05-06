import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreMatchDetailsComponent } from './pre-match-details.component';

describe('PreMatchDetailsComponent', () => {
  let component: PreMatchDetailsComponent;
  let fixture: ComponentFixture<PreMatchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreMatchDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreMatchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
