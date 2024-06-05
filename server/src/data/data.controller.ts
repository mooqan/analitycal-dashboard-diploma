import { Controller, Get, Post, Body } from '@nestjs/common';
import { DataService } from './data.service';
import { DataEntity } from './data.entity';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  async getAllData() {
    return this.dataService.getAllData();
  }

  @Post()
  async createData(@Body() data: Partial<DataEntity>) {
    return this.dataService.createData(data);
  }
}
