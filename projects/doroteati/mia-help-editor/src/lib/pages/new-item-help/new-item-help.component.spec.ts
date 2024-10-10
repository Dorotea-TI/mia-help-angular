import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItemHelpComponent } from './new-item-help.component';

describe('NewItemHelpComponent', () => {
  let component: NewItemHelpComponent;
  let fixture: ComponentFixture<NewItemHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewItemHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewItemHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
