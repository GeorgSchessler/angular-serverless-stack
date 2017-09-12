import { TestBed, inject } from '@angular/core/testing';

import { CongnitoService } from './congnito.service';

describe('CongnitoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CongnitoService]
    });
  });

  it('should be created', inject([CongnitoService], (service: CongnitoService) => {
    expect(service).toBeTruthy();
  }));
});
