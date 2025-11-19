import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailOneComponent } from './job-detail-one.component';

describe('JobDetailOneComponent', () => {
  let component: JobDetailOneComponent;
  let fixture: ComponentFixture<JobDetailOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobDetailOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobDetailOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
