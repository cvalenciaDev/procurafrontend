import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListOneComponent } from './job-list-one.component';

describe('JobListOneComponent', () => {
  let component: JobListOneComponent;
  let fixture: ComponentFixture<JobListOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobListOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobListOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
