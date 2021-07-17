import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { Job } from '../../utils/job';

@Injectable()
export class TwilioService {
  public constructor(
    @InjectTwilio() private readonly client: TwilioClient,
    private config: ConfigService,
  ) {}

  async sendSMS(job: Job) {
    let error = false,
      data = null;
    try {
      data = await this.client.messages.create({
        from: this.config.get('twilio')?.from,
        body: job.payload.body,
        to: job.payload.to,
      });
    } catch (err) {
      error = err;
    }
    job.done({ error, data });
    return job.response;
  }
}
