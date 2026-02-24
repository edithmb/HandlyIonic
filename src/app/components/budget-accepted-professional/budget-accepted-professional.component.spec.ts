import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BudgetAcceptedProfessionalComponent } from './budget-accepted-professional.component';

describe('BudgetAcceptedProfessionalComponent', () => {
  let component: BudgetAcceptedProfessionalComponent;
  let fixture: ComponentFixture<BudgetAcceptedProfessionalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetAcceptedProfessionalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetAcceptedProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
