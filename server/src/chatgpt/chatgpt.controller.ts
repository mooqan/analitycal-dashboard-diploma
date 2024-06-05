import { Controller, Post, Body } from '@nestjs/common';
import { ChatGptService } from './chatgpt.service';

@Controller('chatgpt')
export class ChatGptController {
  constructor(private readonly chatGptService: ChatGptService) {}

  @Post('analyze')
  async analyzeData(@Body() data: any): Promise<string> {
    return this.chatGptService.analyzeData(data);
  }
}
