import { OmitType } from '@nestjs/swagger';
import { Parking } from '../entities/parking.entity';

export class UpdateParkingDto extends OmitType(Parking, [] as const) {}
