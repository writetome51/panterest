import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiServiceTestComponent } from './api-service-test.component';

describe('ApiServiceTestComponent', () => {
  let component: ApiServiceTestComponent;
  let fixture: ComponentFixture<ApiServiceTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiServiceTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiServiceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
