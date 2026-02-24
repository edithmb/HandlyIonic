import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatClientPage } from './chat-client.page';

describe('ChatClientPage', () => {
  let component: ChatClientPage;
  let fixture: ComponentFixture<ChatClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
