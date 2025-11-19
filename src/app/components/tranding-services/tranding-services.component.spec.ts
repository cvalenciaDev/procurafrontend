import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrandingServicesComponent } from './tranding-services.component';

describe('TrandingServicesComponent', () => {
  let component: TrandingServicesComponent;
  let fixture: ComponentFixture<TrandingServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrandingServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrandingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
