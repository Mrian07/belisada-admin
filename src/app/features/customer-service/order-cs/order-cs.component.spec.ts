import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCsComponent } from './order-cs.component';

describe('OrderCsComponent', () => {
  let component: OrderCsComponent;
  let fixture: ComponentFixture<OrderCsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
