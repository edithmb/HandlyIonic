import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobCompletedProfessionalComponent } from './job-completed-professional.component';

describe('JobCompletedProfessionalComponent', () => {
  let component: JobCompletedProfessionalComponent;
  let fixture: ComponentFixture<JobCompletedProfessionalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCompletedProfessionalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobCompletedProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
