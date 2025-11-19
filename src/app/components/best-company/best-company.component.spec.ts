import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestCompanyComponent } from './best-company.component';

describe('BestCompanyComponent', () => {
  let component: BestCompanyComponent;
  let fixture: ComponentFixture<BestCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
