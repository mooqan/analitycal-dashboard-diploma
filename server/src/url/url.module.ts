import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { UrlRepositoryTag } from './url.repository';
import { UrlRepositoryHashmap } from './url.repository.hashmap';

@Module({
  imports: [],
  controllers: [UrlController],
  providers: [
    UrlService,
    { provide: UrlRepositoryTag, useClass: UrlRepositoryHashmap },
  ],
})
export class UrlModule { }
