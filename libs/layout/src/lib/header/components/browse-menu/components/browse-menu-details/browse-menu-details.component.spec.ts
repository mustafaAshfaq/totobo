import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseMenuDetailsComponent } from './browse-menu-details.component';

describe('BrowseMenuDetailsComponent', () => {
  let component: BrowseMenuDetailsComponent;
  let fixture: ComponentFixture<BrowseMenuDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseMenuDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseMenuDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
