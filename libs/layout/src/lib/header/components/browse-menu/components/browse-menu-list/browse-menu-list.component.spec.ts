import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseMenuListComponent } from './browse-menu-list.component';

describe('BrowseMenuListComponent', () => {
  let component: BrowseMenuListComponent;
  let fixture: ComponentFixture<BrowseMenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseMenuListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
