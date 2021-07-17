import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelService } from '../../core/modules/database/model.service';
import { ModelType } from '../../core/modules/database/database.service';
import { Parking } from './entities/parking.entity';
import { Job } from 'src/core/utils/job';
import { LotsService } from '../lots/lots.service';

@Injectable()
export class ParkingService extends ModelService {
  /**
   * searchFields
   * @property array of fields to include in search
   */

  constructor(
    @InjectModel(Parking) model: ModelType<Parking>,
    private readonly lotsService: LotsService,
  ) {
    super(model);
  }

  /**
   * doBeforeWrite
   * @function function will execute before create and update function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {void}
   */
  async doBeforeWrite(job: Job): Promise<void> {
    await super.doBeforeWrite(job);

    /* Set Entry Time */
    if (job.action === 'create') {
      job.body.entry_time = new Date();
      job.body.status = 'filled';
    }
  }

  async doAfterWrite(job: Job): Promise<void> {
    await super.doBeforeWrite(job);
    // console.log('job', job.response.data.lot_id);
    const { error, data } = await this.lotsService.findById(
      new Job({
        owner: {},
        action: 'findById',
        id: +job.response.data.lot_id,
      }),
    );
    if (job.action === 'create') {
      let updateDto = {};
      if (job.response.data.vehicle_type == 'Two-Wheeler') {
        updateDto = {
          two_wheeler_filled_slots: data.two_wheeler_filled_slots + 1,
        };
      } else if (job.response.data.vehicle_type == 'SUV') {
        updateDto = {
          suv_filled_slots: data.suv_filled_slots + 1,
        };
      } else {
        updateDto = {
          hatchback_filled_slots: data.hatchback_filled_slots + 1,
        };
      }

      await this.lotsService.update(
        new Job({
          owner: {},
          action: 'update',
          id: +job.response.data.lot_id,
          body: updateDto,
        }),
      );
    } else {
      let updateDto = {};
      if (job.response.data.vehicle_type == 'Two-Wheeler') {
        updateDto = {
          two_wheeler_filled_slots: data.two_wheeler_filled_slots - 1,
        };
      } else if (job.response.data.vehicle_type == 'SUV') {
        updateDto = {
          suv_filled_slots: data.suv_filled_slots - 1,
        };
      } else {
        updateDto = {
          hatchback_filled_slots: data.hatchback_filled_slots - 1,
        };
      }
      await this.lotsService.update(
        new Job({
          owner: {},
          action: 'update',
          id: +job.response.data.lot_id,
          body: updateDto,
        }),
      );
    }
  }
}
