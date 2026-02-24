import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyIdentityPage } from './verify-identity.page';

describe('VerifyIdentityPage', () => {
  let component: VerifyIdentityPage;
  let fixture: ComponentFixture<VerifyIdentityPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyIdentityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
