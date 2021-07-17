import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeModule as Stripe } from 'nestjs-stripe';
import stripeConfig from '../../../config/stripe';
import { StripeController } from './stripe.controller';
import { MsClientModule } from '../ms-client/ms-client.module';

@Module({
  imports: [
    Stripe.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [stripeConfig],
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('stripe'),
    }),
    MsClientModule,
  ],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
