import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrrrComponent } from './brrr.component';

describe('BrrrComponent', () => {
  let component: BrrrComponent;
  let fixture: ComponentFixture<BrrrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrrrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrrrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
