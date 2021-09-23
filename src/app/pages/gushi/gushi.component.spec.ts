import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GushiComponent } from './gushi.component';

describe('GushiComponent', () => {
  let component: GushiComponent;
  let fixture: ComponentFixture<GushiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GushiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GushiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
