import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { DataEntity } from './data.entity';
import { DataRepository } from './data.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DataEntity, DataRepository])],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
