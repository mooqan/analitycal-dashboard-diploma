import { Inject, Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { map, Observable } from 'rxjs';
import { UrlRepository, UrlRepositoryTag } from './url.repository';


@Injectable()
export class UrlService {
  constructor(
    @Inject(UrlRepositoryTag) private readonly urlRepository: UrlRepository,
  ) {}
 
  shorten(url: string): Observable<string> {
    const hash = Math.random().toString(36).slice(7);
    return this.urlRepository.put(hash, url).pipe(map(() => `http://localhost:3001/api/shorten/${hash}`));
  }
 
  retrieve(hash: string): Observable<string> {
    return this.urlRepository.get(hash); 
  }
  
  create(createUrlDto: CreateUrlDto) {
    return 'This action adds a new url';
  }

  findAll() {
    return `This action returns all url`;
  }

  findOne(id: number) {
    return `This action returns a #${id} url`;
  }

  update(id: number, updateUserDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}


