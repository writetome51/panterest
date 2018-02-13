import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseWindowComponent } from './browse-window.component';

describe('BrowseWindowComponent', () => {
  let component: BrowseWindowComponent;
  let fixture: ComponentFixture<BrowseWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
