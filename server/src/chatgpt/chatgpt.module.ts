import { Module } from '@nestjs/common';
import { ChatGptService } from './chatgpt.service';
import { ChatGptController } from './chatgpt.controller';

@Module({
  providers: [ChatGptService],
  controllers: [ChatGptController],
})
export class ChatGptModule {}
