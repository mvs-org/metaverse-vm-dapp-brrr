import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterIndicatorComponent } from './counter-indicator.component';

describe('CounterIndicatorComponent', () => {
  let component: CounterIndicatorComponent;
  let fixture: ComponentFixture<CounterIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
