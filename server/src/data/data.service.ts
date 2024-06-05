import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataEntity } from './data.entity';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(DataEntity)
    private readonly dataRepository: Repository<DataEntity>,
  ) {}

  async getAllData(): Promise<DataEntity[]> {
    return this.dataRepository.find();
  }

  async createData(data: Partial<DataEntity>): Promise<DataEntity> {
    const newData = this.dataRepository.create(data);
    return this.dataRepository.save(newData);
  }
}
