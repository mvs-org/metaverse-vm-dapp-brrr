import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrrrIndicatorComponent } from './brrr-indicator.component';

describe('BrrrIndicatorComponent', () => {
  let component: BrrrIndicatorComponent;
  let fixture: ComponentFixture<BrrrIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrrrIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrrrIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
