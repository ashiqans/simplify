import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSuggestionComponent } from './view-suggestion.component';

describe('ViewSuggestionComponent', () => {
  let component: ViewSuggestionComponent;
  let fixture: ComponentFixture<ViewSuggestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSuggestionComponent]
    });
    fixture = TestBed.createComponent(ViewSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
