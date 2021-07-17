import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Table, Column, Index, ForeignKey } from 'sequelize-typescript';
import { Entity } from '../../../core/modules/database/entity';
import { Lot } from '../../lots/entities/lots.entity';

@Table
export class Parking extends Entity<Parking> {
  @Column
  @ForeignKey(() => Lot)
  @ApiProperty({
    description: 'Lot Id',
    example: 1,
  })
  @IsNumber()
  lot_id: number;

  @Column
  @Index
  @ApiProperty({
    description: 'Vehicle Number',
    example: 'KL074567',
  })
  @IsString()
  vehicle_number: string;

  @Column
  @Index
  @ApiProperty({
    description: 'Vehicle Type',
    example: 'Two-Wheeler',
  })
  @IsString()
  vehicle_type: string;

  @Column
  @ApiProperty({
    description: 'Entry Time',
    example: '2021-07-17 12:49:00',
  })
  entry_time: Date;

  @Column
  @ApiProperty({
    description: 'Exit Time',
    example: '2021-07-17 12:49:00',
  })
  @IsOptional()
  exit_time: Date;

  @Column
  @ApiProperty({
    description: 'Lot Status',
    example: 'filled',
  })
  @IsString()
  @IsOptional()
  status: string;

  @Column
  @ApiProperty({
    description: 'Price',
    example: 303,
  })
  @IsNumber()
  @IsOptional()
  price: number;
}
