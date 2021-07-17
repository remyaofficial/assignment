import { OmitType } from '@nestjs/swagger';
import { Lot } from '../entities/lots.entity';

export class UpdateLotDto extends OmitType(Lot, [] as const) {}
