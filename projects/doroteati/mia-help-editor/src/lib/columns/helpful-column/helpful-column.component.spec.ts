import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpfulColumnComponent } from './helpful-column.component';

describe('HelpfulColumnComponent', () => {
  let component: HelpfulColumnComponent;
  let fixture: ComponentFixture<HelpfulColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpfulColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpfulColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
