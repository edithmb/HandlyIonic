import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchAProfessionalPage } from './search-a-professional.page';

describe('SearchAProfessionalPage', () => {
  let component: SearchAProfessionalPage;
  let fixture: ComponentFixture<SearchAProfessionalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAProfessionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
