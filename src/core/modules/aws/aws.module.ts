import { Module } from '@nestjs/common';
import { AwsSdkModule } from 'nest-aws-sdk';
import { ConfigModule, ConfigService } from '@nestjs/config';
import awsConfig from '../../../config/aws';

@Module({
  imports: [
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        imports: [
          ConfigModule.forRoot({
            load: [awsConfig],
          }),
        ],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => configService.get('aws'),
      },
      services: [],
    }),
  ],
  providers: [],
})
export class AwsModule {}
