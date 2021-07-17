import {
  Controller,
  Req,
  Res,
  Body,
  Param,
  Query,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Job } from '../../core/utils/job';
import { Owner, OwnerDto } from '../../decorators/owner.decorator';
import {
  Created,
  ErrorResponse,
  Result,
  NotFound,
} from '../../core/utils/responses';
import { NotFoundError } from '../../core/utils/errors';
import { Parking } from './entities/parking.entity';
import { ParkingService } from './parking.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import {
  ResponseForbidden,
  ResponseInternalServerError,
} from '../../core/utils/definitions';
import {
  ApiQueryGetAll,
  ApiQueryGetById,
  ApiQueryGetOne,
  ResponseCreated,
  ResponseDeleted,
  ResponseGetAll,
  ResponseGetOne,
  ResponseUpdated,
} from '../../core/utils/decorators';
import { Public } from 'src/decorators/public.decorator';
import * as moment from 'moment-timezone';
import { LotsService } from '../lots/lots.service';

@ApiTags('parking')
@ApiBearerAuth()
@ApiForbiddenResponse(ResponseForbidden)
@ApiInternalServerErrorResponse(ResponseInternalServerError)
@ApiExtraModels(Parking)
@Controller('parking')
export class ParkingController {
  constructor(
    private readonly parkingService: ParkingService,
    private readonly lotsService: LotsService,
  ) {}

  /**
   * Create a new parking
   */
  @Post()
  @Public()
  @ApiOperation({ summary: 'Create a new parking' })
  @ResponseCreated(Parking)
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Body() createParkingDto: CreateParkingDto,
  ) {
    const { error, data } = await this.parkingService.create(
      new Job({
        owner,
        action: 'create',
        body: createParkingDto,
      }),
    );

    if (!!error) {
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Created(res, { data: { parking: data }, message: 'Created' });
  }

  /**
   * Update a parking using id
   */
  @Put(':id')
  @Public()
  @ApiOperation({ summary: 'Update a parking using id' })
  @ResponseUpdated(Parking)
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Body() updateParkingDto: UpdateParkingDto,
  ) {
    const { error, data } = await this.parkingService.update(
      new Job({
        owner,
        action: 'update',
        id: +id,
        body: updateParkingDto,
      }),
    );

    if (!!error) {
      if (error instanceof NotFoundError) {
        return NotFound(res, {
          error,
          message: `Record not found`,
        });
      }
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Result(res, { data: { parking: data }, message: 'Updated' });
  }

  /**
   * Return all parkings list
   */
  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all parkings history' })
  @ApiQueryGetAll()
  @ResponseGetAll(Parking)
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    console.log('query==', query);
    const { error, data, offset, limit, count } =
      await this.parkingService.findAll(
        new Job({
          owner,
          action: 'findAll',
          // options: { ...query },
          options: {
            where: {
              vehicle_number: 'KL074567',
            },
          },
        }),
      );

    if (!!error) {
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Result(res, {
      data: { parkings: data, offset, limit, count },
      message: 'Ok',
    });
  }

  /**
   * Get a parking by id
   */
  @Get('exit/:id')
  @Public()
  @ApiOperation({ summary: 'Exit parking using id' })
  @ApiQueryGetById()
  @ResponseGetOne(Parking)
  async findParkingById(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Query() query: any,
  ) {
    const { error, data } = await this.parkingService.findById(
      new Job({
        owner,
        action: 'findById',
        id: +id,
        options: { ...query },
      }),
    );

    if (!!error) {
      if (error instanceof NotFoundError) {
        return NotFound(res, {
          error,
          message: `Record not found`,
        });
      }
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    const exit_time = moment();
    const entry_time = moment(data.entry_time);
    const duration = exit_time.diff(entry_time, 'hours');
    let price = 20;
    if (duration <= 2) {
      price = 20;
    } else if (duration <= 4) {
      price = 40;
    } else if (duration <= 12) {
      price = 100;
    } else {
      price = 500;
    }
    const updateDto = {
      price,
      exit_time,
      status: 'closed',
    };

    const update_result = await this.parkingService.update(
      new Job({
        owner,
        action: 'update',
        id: +id,
        body: updateDto,
      }),
    );

    if (!!update_result.error) {
      if (error instanceof NotFoundError) {
        return NotFound(res, {
          error,
          message: `Record not found`,
        });
      }
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Result(res, {
      data: { parking: update_result.data },
      message: 'Exited',
    });
  }
}
