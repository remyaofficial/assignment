import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { Parking } from './entities/parking.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { LotsModule } from '../lots/lots.module';

@Module({
  imports: [SequelizeModule.forFeature([Parking]), LotsModule],

  providers: [ParkingService],
  controllers: [ParkingController]
})
export class ParkingModule {}
