import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GoldenComponent } from './golden.component';

describe('GoldenComponent', () => {
  let component: GoldenComponent;
  let fixture: ComponentFixture<GoldenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GoldenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
