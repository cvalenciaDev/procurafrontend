import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryOneComponent } from './category-one.component';

describe('CategoryOneComponent', () => {
  let component: CategoryOneComponent;
  let fixture: ComponentFixture<CategoryOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
