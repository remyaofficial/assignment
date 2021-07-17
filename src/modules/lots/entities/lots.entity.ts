import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Table, Column, Index } from 'sequelize-typescript';
import { Entity } from '../../../core/modules/database/entity';

@Table
export class Lot extends Entity<Lot> {
  @Column
  @ApiProperty({
    description: 'Platform',
    example: 1,
  })
  @IsNumber()
  platform: number;

  @Column
  @Index
  @ApiProperty({
    description: 'Parking Lot Name',
    example: '1A',
  })
  @IsString()
  @IsOptional()
  lot_name: string;

  @Column
  @ApiProperty({
    description: 'Total Parking Lots',
    example: 100,
  })
  @IsNumber()
  total_parking_slots: number;

  @Column
  @ApiProperty({
    description: 'Two- wheeler Parking Lots',
    example: 20,
  })
  @IsNumber()
  two_wheeler_parking_slots: number;

  @Column
  @ApiProperty({
    description: 'Hatchback Car Parking Lots',
    example: 50,
  })
  @IsNumber()
  hatchback_parking_slots: number;

  @Column
  @ApiProperty({
    description: 'SUV aAr Parking Lots',
    example: 30,
  })
  @IsNumber()
  suv_parking_slots: number;

  @Column
  @ApiProperty({
    description: 'Two- wheeler Filled Lots Count',
    example: 20,
  })
  @IsNumber()
  two_wheeler_filled_slots: number;

  @Column
  @ApiProperty({
    description: 'Hatchback Car Filled Lots Count',
    example: 50,
  })
  @IsNumber()
  hatchback_filled_slots: number;

  @Column
  @ApiProperty({
    description: 'SUV aAr Filled Lots Count',
    example: 30,
  })
  @IsNumber()
  suv_filled_slots: number;

}
