import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { MsClientModule } from '../../ms-client/ms-client.module';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';
import s3Config from '../../../../config/s3';

@Module({
  imports: [
    AwsSdkModule.forFeatures([S3]),
    ConfigModule.forRoot({
      load: [s3Config],
    }),
    MsClientModule,
  ],
  controllers: [S3Controller],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
