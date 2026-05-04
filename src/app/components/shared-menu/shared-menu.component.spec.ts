import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SharedMenuComponent } from './shared-menu.component';

describe('SharedMenuComponent', () => {
  let component: SharedMenuComponent;
  let fixture: ComponentFixture<SharedMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
