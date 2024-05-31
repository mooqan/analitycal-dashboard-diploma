import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl } from "class-validator";

export class UrlDto {
    @ApiProperty({
        type: 'string',
        example: 'https://example.com'
    })
    @IsNotEmpty({ message: 'URL cannot be empty' })
    @IsUrl({}, { message: 'Invalid URL' })
    url: string;
}