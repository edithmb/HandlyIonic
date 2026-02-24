import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeProfessionalPage } from './home-professional.page';

describe('HomeProfessionalPage', () => {
  let component: HomeProfessionalPage;
  let fixture: ComponentFixture<HomeProfessionalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProfessionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
