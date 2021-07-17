import { Controller } from '@nestjs/common';
import { MsListener } from '../../../core/utils/decorators';
import { Job, JobResponse } from '../../utils/job';
import { StripeService } from './stripe.service';
import { MsClientService } from '../../modules/ms-client/ms-client.service';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private client: MsClientService,
  ) {}

  /**
   * Queue listener for Stripe
   */
  @MsListener('controller.stripe')
  async execute(job: Job): Promise<void> {
    job = new Job(job);
    await this.stripeService[job.action]<JobResponse>(job);
    await this.client.jobDone(job);
  }
}
