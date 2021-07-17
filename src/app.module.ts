import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { CachingModule } from './core/modules/caching/caching.module';
import { DatabaseModule } from './core/modules/database/database.module';
import { StaticPathModule } from './core/modules/static-path/static-path.module';
import { HealthModule } from './core/modules/health/health.module';
import { MongoModule } from './core/modules/mongo/mongo.module';
import { SeederModule } from './core/modules/seeder/seeder.module';
import { SessionModule } from './core/modules/session/session.module';
import { SocketModule } from './core/modules/socket/socket.module';
import { LotsModule } from './modules/lots/lots.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { ParkingModule } from './modules/parking/parking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    CachingModule,
    ScheduleModule.forRoot(),
    StaticPathModule,
    DatabaseModule,
    MongoModule,
    SeederModule,
    HealthModule,
    SessionModule,
    SocketModule,
    LotsModule,
    VehicleModule,
    ParkingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
