import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlistTestComponent } from './userlist-test.component';

describe('UserlistTestComponent', () => {
  let component: UserlistTestComponent;
  let fixture: ComponentFixture<UserlistTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserlistTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlistTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
