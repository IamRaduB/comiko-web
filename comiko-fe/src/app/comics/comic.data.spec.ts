import { TestBed } from '@angular/core/testing';

import { Comic.DataService } from './comic.data.service';

describe('Comic.DataService', () => {
  let service: Comic.DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Comic.DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
