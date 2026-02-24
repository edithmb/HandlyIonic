import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpClientPage } from './sign-up-client.page';

describe('SignUpClientPage', () => {
  let component: SignUpClientPage;
  let fixture: ComponentFixture<SignUpClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
