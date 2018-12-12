import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMPComponent } from './modal-mp.component';

describe('ModalMPComponent', () => {
  let component: ModalMPComponent;
  let fixture: ComponentFixture<ModalMPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
