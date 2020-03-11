import { TestBed } from '@angular/core/testing';

import { DecodeficacionServiceService } from './decodeficacion-service.service';

describe('DecodeficacionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DecodeficacionServiceService = TestBed.get(DecodeficacionServiceService);
    expect(service).toBeTruthy();
  });
});
