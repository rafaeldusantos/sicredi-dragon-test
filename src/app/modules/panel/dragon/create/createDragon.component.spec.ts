import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDragonComponent } from './createDragon.component';

describe('CreateDragonComponent', () => {
  let component: CreateDragonComponent;
  let fixture: ComponentFixture<CreateDragonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDragonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDragonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
