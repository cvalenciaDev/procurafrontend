import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreJobComponent } from './explore-job.component';

describe('ExploreJobComponent', () => {
  let component: ExploreJobComponent;
  let fixture: ComponentFixture<ExploreJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
