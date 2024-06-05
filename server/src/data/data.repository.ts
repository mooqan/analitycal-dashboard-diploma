import { Repository } from 'typeorm';
import { DataEntity } from './data.entity';

export class DataRepository extends Repository<DataEntity> {}
