import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileEditClientPage } from './profile-edit-client.page';

describe('ProfileEditClientPage', () => {
  let component: ProfileEditClientPage;
  let fixture: ComponentFixture<ProfileEditClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
