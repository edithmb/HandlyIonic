import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileEditProfessionalPage } from './profile-edit-professional.page';

describe('ProfileEditProfessionalPage', () => {
  let component: ProfileEditProfessionalPage;
  let fixture: ComponentFixture<ProfileEditProfessionalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditProfessionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
