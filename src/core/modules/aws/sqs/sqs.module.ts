import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SQS } from 'aws-sdk';
import { AwsSdkModule } from 'nest-aws-sdk';
import { MsClientModule } from '../../ms-client/ms-client.module';
import { SQSController } from './sqs.controller';
import { SQSService } from './sqs.service';
import sqsConfig from '../../../../config/sqs';

@Module({
  imports: [
    AwsSdkModule.forFeatures([SQS]),
    ConfigModule.forRoot({
      load: [sqsConfig],
    }),
    MsClientModule,
  ],
  controllers: [SQSController],
  providers: [SQSService],
  exports: [SQSService],
})
export class SQSModule {}
