import { TestBed } from '@angular/core/testing';

import { StrayReportService } from './stray-report.service';

describe('StrayReportService', () => {
  let service: StrayReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrayReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
