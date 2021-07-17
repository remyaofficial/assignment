import { OmitType } from '@nestjs/swagger';
import { Lot } from '../entities/lots.entity';

export class CreateLotDto extends OmitType(Lot, ['active'] as const) {}
