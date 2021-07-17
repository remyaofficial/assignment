import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SendGridModule as NestSendGridModule } from '@ntegral/nestjs-sendgrid';
import sendGridConfig from '../../../config/send-grid';
import { MsClientModule } from '../ms-client/ms-client.module';
import { SendGridController } from './send-grid.controller';
import { SendGridService } from './send-grid.service';

@Module({
  imports: [
    NestSendGridModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [sendGridConfig],
        }),
      ],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('send-grid'),
    }),
    MsClientModule,
  ],
  controllers: [SendGridController],
  providers: [SendGridService],
  exports: [NestSendGridModule],
})
export class SendGridModule {}
