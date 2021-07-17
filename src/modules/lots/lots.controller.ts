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
import { Lot } from './entities/lots.entity';
import { LotsService } from './lots.service';
import { CreateLotDto } from './dto/create-lots.dto';
import { UpdateLotDto } from './dto/update-lots.dto';
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
import { publicDecrypt } from 'crypto';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('lots')
@ApiBearerAuth()
@ApiForbiddenResponse(ResponseForbidden)
@ApiInternalServerErrorResponse(ResponseInternalServerError)
@ApiExtraModels(Lot)
@Controller('lots')
export class LotsController {
  constructor(private readonly lotsService: LotsService) {}

  /**
   * Create a new lot
   */
  @Post()
  @Public()
  @ApiOperation({ summary: 'Create a new lot' })
  @ResponseCreated(Lot)
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Body() createLotDto: CreateLotDto,
  ) {
    const { error, data } = await this.lotsService.create(
      new Job({
        owner,
        action: 'create',
        body: createLotDto,
      }),
    );

    if (!!error) {
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Created(res, { data: { lot: data }, message: 'Created' });
  }

  /**
   * Update a lot using id
   */
  @Put(':id')
  @Public()
  @ApiOperation({ summary: 'Update a lot using id' })
  @ResponseUpdated(Lot)
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Body() updateLotDto: UpdateLotDto,
  ) {
    const { error, data } = await this.lotsService.update(
      new Job({
        owner,
        action: 'update',
        id: +id,
        body: updateLotDto,
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
    return Result(res, { data: { lot: data }, message: 'Updated' });
  }

  /**
   * Return all lots list
   */
  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all lots' })
  @ApiQueryGetAll()
  @ResponseGetAll(Lot)
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data, offset, limit, count } =
      await this.lotsService.findAll(
        new Job({
          owner,
          action: 'findAll',
          options: { ...query },
        }),
      );

    if (!!error) {
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Result(res, {
      data: { lots: data, offset, limit, count },
      message: 'Ok',
    });
  }
}
