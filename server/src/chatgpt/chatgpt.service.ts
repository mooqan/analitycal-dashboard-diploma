import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class ChatGptService {
    private openai: OpenAI;

    constructor(private readonly configService: ConfigService) {
        this.openai = new OpenAI({
            apiKey: this.configService.get<string>('OPENAI_API_KEY'),
        });
    }

    async analyzeData(data: any): Promise<string> {
        const messages = [
            {
                role: 'system', content: `1. Ты полезный специалист по анализу данных
      2. Ты специализируешься на анализе показателей предприятия, таких как расходы, доходы и продажи
      3. Твоя задача анализировать показатели и на основе анализа предлагать советы по маркетингу и продажам, в какие месяцы производить больше товаров, в какие месяцы приостанавливать, прогнозировать спрос и предложение
      4. Отвечай коротко и по делу` },
            { role: 'user', content: `Проанализируй следующие данные и выдай рекомендации:\n\n${JSON.stringify(data, null, 2)}` },
        ];

        const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages as any[],
            max_tokens: 450,
        });

        return response.choices[0].message.content.trim();
    }
}
