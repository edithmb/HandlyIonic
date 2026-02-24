import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatProfessionalPage } from './chat-professional.page';

describe('ChatProfessionalPage', () => {
  let component: ChatProfessionalPage;
  let fixture: ComponentFixture<ChatProfessionalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatProfessionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
