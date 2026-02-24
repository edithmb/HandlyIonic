import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectionRolPage } from './selection-rol.page';

describe('SelectionRolPage', () => {
  let component: SelectionRolPage;
  let fixture: ComponentFixture<SelectionRolPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionRolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
