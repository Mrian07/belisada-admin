import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreContohComponent } from './store-contoh.component';

describe('StoreContohComponent', () => {
  let component: StoreContohComponent;
  let fixture: ComponentFixture<StoreContohComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreContohComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreContohComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
