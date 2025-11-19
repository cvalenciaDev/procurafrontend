import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTwoComponent } from './category-two.component';

describe('CategoryTwoComponent', () => {
  let component: CategoryTwoComponent;
  let fixture: ComponentFixture<CategoryTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
