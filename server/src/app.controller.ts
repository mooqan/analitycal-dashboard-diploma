import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
 
interface ShortenResponse {
  hash: string;
}
 
interface ErrorResponse {
  error: string;
  code: number;
}
 
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
 
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
 
}