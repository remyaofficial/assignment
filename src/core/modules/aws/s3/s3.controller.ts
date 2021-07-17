import { Controller } from '@nestjs/common';
import { Job, JobResponse } from '../../../utils/job';
import { S3Service } from './s3.service';
import { MsClientService } from '../../../modules/ms-client/ms-client.service';
import { MsListener } from '../../../../core/utils/decorators';

@Controller('s3')
export class S3Controller {
  constructor(
    private readonly s3Service: S3Service,
    private client: MsClientService,
  ) {}

  /**
   * Queue listener for S3
   */
  @MsListener('controller.s3')
  async execute(job: Job): Promise<void> {
    job = new Job(job);
    await this.s3Service[job.action]<JobResponse>(job);
    await this.client.jobDone(job);
  }
}
