import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicNavComponent } from './comic-nav.component';

describe('ComicNavComponent', () => {
  let component: ComicNavComponent;
  let fixture: ComponentFixture<ComicNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
