import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPComponent } from './master-p.component';

describe('MasterPComponent', () => {
  let component: MasterPComponent;
  let fixture: ComponentFixture<MasterPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
