import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KantuComponent } from './kantu.component';

describe('KantuComponent', () => {
  let component: KantuComponent;
  let fixture: ComponentFixture<KantuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KantuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KantuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
