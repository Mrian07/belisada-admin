import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecValueComponent } from './spec-value.component';

describe('SpecValueComponent', () => {
  let component: SpecValueComponent;
  let fixture: ComponentFixture<SpecValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
