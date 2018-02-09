import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedRecepieComponent } from './featured-recepie.component';

describe('FeaturedRecepieComponent', () => {
  let component: FeaturedRecepieComponent;
  let fixture: ComponentFixture<FeaturedRecepieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedRecepieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedRecepieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
