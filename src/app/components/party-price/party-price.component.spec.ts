import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyPriceComponent } from './party-price.component';

describe('PartyPriceComponent', () => {
  let component: PartyPriceComponent;
  let fixture: ComponentFixture<PartyPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
