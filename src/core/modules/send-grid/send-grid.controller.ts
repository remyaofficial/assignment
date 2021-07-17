import { Controller } from '@nestjs/common';
import { MsListener } from '../../../core/utils/decorators';
import { Job, JobResponse } from '../../utils/job';
import { SendGridService } from './send-grid.service';
import { MsClientService } from '../../modules/ms-client/ms-client.service';

@Controller('send-grid')
export class SendGridController {
  constructor(
    private readonly sendGridService: SendGridService,
    private client: MsClientService,
  ) {}

  /**
   * Queue listener for SendGrid
   */
  @MsListener('controller.send-grid')
  async execute(job: Job): Promise<void> {
    job = new Job(job);
    await this.sendGridService[job.action]<JobResponse>(job);
    await this.client.jobDone(job);
  }
}
