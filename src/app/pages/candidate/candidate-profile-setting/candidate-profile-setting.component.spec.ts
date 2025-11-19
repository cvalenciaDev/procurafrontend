import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateProfileSettingComponent } from './candidate-profile-setting.component';

describe('CandidateProfileSettingComponent', () => {
  let component: CandidateProfileSettingComponent;
  let fixture: ComponentFixture<CandidateProfileSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateProfileSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateProfileSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
