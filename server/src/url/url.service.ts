import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';
import * as QRCode from 'qrcode';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
  ) {}

  private generateShortUrl(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  async shortenUrl(originalUrl: string): Promise<string> {
    let shortUrl: string;
    let existingUrl: Url;

    do {
      shortUrl = this.generateShortUrl(6);
      existingUrl = await this.urlRepository.findOneBy({ shortUrl });
    } while (existingUrl);

    const newUrl = this.urlRepository.create({ originalUrl, shortUrl });
    await this.urlRepository.save(newUrl);
    return shortUrl;
  }

  async getOriginalUrl(shortUrl: string): Promise<string> {
    const url = await this.urlRepository.findOneBy({ shortUrl });
    if (url) {
      return url.originalUrl;
    }
    return null;
  }

  async generateQrCode(shortUrl: string): Promise<string> {
    const url = `http://localhost:3000/shorten/${shortUrl}`;
    return QRCode.toDataURL(url);
  }
}
