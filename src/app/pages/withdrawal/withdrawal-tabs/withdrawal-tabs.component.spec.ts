import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalTabsComponent } from './withdrawal-tabs.component';

describe('WithdrawalTabsComponent', () => {
  let component: WithdrawalTabsComponent;
  let fixture: ComponentFixture<WithdrawalTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
