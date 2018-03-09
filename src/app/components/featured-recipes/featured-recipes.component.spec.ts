import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedRecipesComponent } from './featured-recipes.component';

describe('FeaturedRecepieComponent', () => {
  let component: FeaturedRecipesComponent;
  let fixture: ComponentFixture<FeaturedRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
