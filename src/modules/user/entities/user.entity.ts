import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  BelongsTo,
  ForeignKey,
  DefaultScope,
  BeforeSave,
  BeforeCreate,
  DataType,
} from 'sequelize-typescript';
import { Entity } from '../../../core/modules/database/entity';
import { uuid } from '../../../core/utils/helpers';
// import { AuthProvider } from '../../auth/auth-provider.enum';
import {
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
  IsNumberString,
  MinLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';

@DefaultScope(() => ({
  attributes: { exclude: ['password', 'deleted_at'] },
}))
@Table
export class User extends Entity<User> {
  @Column({ unique: 'uid' })
  @ApiProperty({
    description: 'Unique ID',
    example: 'a926d382-6741-4d95-86cf-1f5c421cf654',
    readOnly: true,
  })
  uid: string;

  @Column
  @ApiProperty({
    description: 'First Name',
    example: 'Ross',
  })
  @IsString()
  first_name: string;

  @Column
  @ApiProperty({
    description: 'Last Name',
    example: 'Geller',
  })
  @IsString()
  last_name: string;

  @Column
  @ApiProperty({
    description: 'Full Name',
    example: 'Ross Geller',
    readOnly: true,
  })
  full_name?: string;

  @Column
  @ApiProperty({
    description: 'Email',
    example: 'ross.geller@gmail.com',
  })
  @IsString()
  @IsEmail()
  email: string;
}
