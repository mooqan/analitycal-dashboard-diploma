import { Controller, Get, Post, Body, Patch, Param, Delete, Redirect } from '@nestjs/common';
import { UrlService } from './url.service';
import { map, Observable, of } from 'rxjs';
import { UpdateUrlDto } from './dto/update-url.dto';
import { hash } from 'crypto';
import { UrlDto } from './dto/url.dto';

 
interface ShortenResponse {
  hash: string;
}
 
interface ErrorResponse {
  error: string;
  code: number;
}
 
@Controller('shorten')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}
 
  @Post()
  shorten(@Body() url: UrlDto): Observable<ShortenResponse | ErrorResponse> {
    if (!url) {
      return of({ error: `No url provided. Please provide in the body. E.g. {'url':'https://google.com'}`, code: 400 });
    }
    return this.urlService.shorten(url.url).pipe(map(hash => ({ hash })));
  }
 
  @Get(':hash')
  @Redirect()
  retrieveAndRedirect(@Param('hash') hash): Observable<{ url: string }> {
    
    return this.urlService.retrieve(hash).pipe(map(url => ({ url })));
  }

  @Patch(':hash')
  update(@Param('hash') id: string, @Body() updateUserDto: UpdateUrlDto) {
    return this.urlService.update(+hash, updateUserDto);
  }

  @Delete(':hash')
  remove(@Param('hash') id: string) {
    return this.urlService.remove(+hash);
  }

}