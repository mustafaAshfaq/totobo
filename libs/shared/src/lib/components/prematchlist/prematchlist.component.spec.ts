import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrematchlistComponent } from './prematchlist.component';

describe('PrematchlistComponent', () => {
  let component: PrematchlistComponent;
  let fixture: ComponentFixture<PrematchlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrematchlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrematchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
