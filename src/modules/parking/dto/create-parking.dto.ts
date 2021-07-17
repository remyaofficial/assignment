import { OmitType } from '@nestjs/swagger';
import { Parking } from '../entities/parking.entity';

export class CreateParkingDto extends OmitType(Parking, ['active'] as const) {}
