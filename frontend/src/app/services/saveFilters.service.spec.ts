import { TestBed } from '@angular/core/testing';

import { SaveSearchService} from "./saveFilters.service";

describe('S', () => {
  let service: SaveSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
