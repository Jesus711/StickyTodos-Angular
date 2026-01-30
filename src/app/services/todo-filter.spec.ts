import { TestBed } from '@angular/core/testing';

import { TodoFilterService } from './todo-filter.service';

describe('TodoFilterServiceTs', () => {
  let service: TodoFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
