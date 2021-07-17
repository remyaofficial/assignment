import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LotsController } from './lots.controller';
import { LotsService } from './lots.service';
import { Lot } from './entities/lots.entity';

@Module({
  imports: [SequelizeModule.forFeature([Lot])],
  controllers: [LotsController],
  providers: [LotsService],
  exports: [LotsService],
})
export class LotsModule {}
