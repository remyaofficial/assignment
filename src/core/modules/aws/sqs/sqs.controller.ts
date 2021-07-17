import { Controller } from '@nestjs/common';
import { Job, JobResponse } from '../../../utils/job';
import { SQSService } from './sqs.service';
import { MsClientService } from '../../../modules/ms-client/ms-client.service';
import { MsListener } from '../../../../core/utils/decorators';

@Controller('sqs')
export class SQSController {
  constructor(
    private readonly sqsService: SQSService,
    private client: MsClientService,
  ) {}

  /**
   * Queue listener for SQS
   */
  @MsListener('controller.sqs')
  async execute(job: Job): Promise<void> {
    job = new Job(job);
    await this.sqsService[job.action]<JobResponse>(job);
    await this.client.jobDone(job);
  }
}
