import { Injectable } from '@nestjs/common';
import {
  InjectSendGrid,
  SendGridService as NestSendGridService,
} from '@ntegral/nestjs-sendgrid';
import { Job } from '../../utils/job';

@Injectable()
export class SendGridService {
  constructor(@InjectSendGrid() private readonly client: NestSendGridService) {}

  async sendMail(job: Job) {
    let error = false,
      data = null;
    try {
      data = await this.client.send({
        to: job.payload.to,
        subject: job.payload.subject,
        text: job.payload.text,
        html: job.payload.html,
        attachments: job.payload.attachments || [],
      });
    } catch (err) {
      error = err;
    }
    job.done({ error, data });
    return job.response;
  }
}
