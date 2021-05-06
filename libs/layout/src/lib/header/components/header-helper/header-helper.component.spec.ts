import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHelperComponent } from './header-helper.component';

describe('HeaderHelperComponent', () => {
  let component: HeaderHelperComponent;
  let fixture: ComponentFixture<HeaderHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
