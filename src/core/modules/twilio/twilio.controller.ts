import { Controller } from '@nestjs/common';
import { MsListener } from '../../../core/utils/decorators';
import { Job, JobResponse } from '../../utils/job';
import { TwilioService } from './twilio.service';
import { MsClientService } from '../../modules/ms-client/ms-client.service';

@Controller('twilio')
export class TwilioController {
  constructor(
    private readonly twilioService: TwilioService,
    private client: MsClientService,
  ) {}

  /**
   * Queue listener for Twilio
   */
  @MsListener('controller.twilio')
  async execute(job: Job): Promise<void> {
    job = new Job(job);
    await this.twilioService[job.action]<JobResponse>(job);
    await this.client.jobDone(job);
  }
}
