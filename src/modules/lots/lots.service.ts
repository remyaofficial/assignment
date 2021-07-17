import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelService } from '../../core/modules/database/model.service';
import { ModelType } from '../../core/modules/database/database.service';
import { Lot } from './entities/lots.entity';

@Injectable()
export class LotsService extends ModelService {
  /**
   * searchFields
   * @property array of fields to include in search
   */
  searchFields: string[] = ['name'];

  constructor(@InjectModel(Lot) model: ModelType<Lot>) {
    super(model);
  }
}


