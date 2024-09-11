import { TestBed } from '@angular/core/testing';

import { ColorHeartService } from './color-heart.service';

describe('ColorHeartService', () => {
  let service: ColorHeartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorHeartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
