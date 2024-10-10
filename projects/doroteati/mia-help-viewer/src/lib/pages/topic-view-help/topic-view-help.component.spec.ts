import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicViewHelpComponent } from './topic-view-help.component';

describe('TopicViewHelpComponent', () => {
  let component: TopicViewHelpComponent;
  let fixture: ComponentFixture<TopicViewHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicViewHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicViewHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
