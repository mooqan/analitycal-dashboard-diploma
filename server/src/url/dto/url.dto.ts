import { ApiProperty } from "@nestjs/swagger";

export class UrlDto {
    @ApiProperty({
        type: 'string',
        example: 'https://example.com'
    })
    url: string
}