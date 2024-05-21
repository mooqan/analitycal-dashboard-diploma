import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({
        type: 'string',
    })
    email: string
    password: string
}