import { Controller, Post, Body, Get, Param, Res, NotFoundException, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiProduces, ApiBody } from '@nestjs/swagger';
import { UrlDto } from './dto/url.dto';
import { UrlService } from './url.service';

@ApiTags('Shorten')
@Controller('shorten')
export class UrlController {
  constructor(private readonly shortenService: UrlService) {}

  @ApiOperation({ summary: 'Create a short URL' })
  @ApiBody({ type: UrlDto })
  @ApiResponse({ status: 201, description: 'The URL has been successfully shortened.' })
  @ApiResponse({ status: 400, description: 'Invalid URL.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async createShortUrl(@Body('url') url: string): Promise<{ shortUrl: string }> {
    if(!url.length) {
      throw new BadRequestException('URL cannot be empty');
  }
    const shortUrl = await this.shortenService.shortenUrl(url);
    return { shortUrl };
  }

  @ApiOperation({ summary: 'Redirect to the original URL' })
  @ApiResponse({ status: 302, description: 'Redirecting to the original URL.' })
  @ApiResponse({ status: 404, description: 'Short URL not found.' })
  @Get(':shortUrl')
  async redirect(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    const originalUrl = await this.shortenService.getOriginalUrl(shortUrl);
    if (originalUrl) {
      return res.redirect(originalUrl);
    } else {
      return res.status(404).send('Not found');
    }
  }

  @ApiOperation({ summary: 'Generate QR code for short URL' })
  @ApiResponse({
    status: 200,
    description: 'QR code generated successfully.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            qrCode: {
              type: 'string',
              description: 'Base64 encoded QR code image',
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Short URL not found.' })
  @ApiProduces('application/json')
  @Get(':shortUrl/qrcode')
  async getQrCode(@Param('shortUrl') shortUrl: string): Promise<{ qrCode: string }> {
    const originalUrl = await this.shortenService.getOriginalUrl(shortUrl);
    if (originalUrl) {
      const qrCodeDataUrl = await this.shortenService.generateQrCode(shortUrl);
      return { qrCode: qrCodeDataUrl };
    } else {
      throw new NotFoundException('Short URL not found');
    }
  }
}
