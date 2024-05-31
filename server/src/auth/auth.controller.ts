import { Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { AuthDto } from "./dto/auth.dto";
import { ApiBody, ApiOperation } from "@nestjs/swagger";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiOperation({ summary: 'Login to existing account' })
    @ApiBody({ type: AuthDto })
    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
    @ApiOperation({ summary: 'Get profile' })
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
      return req.user;
    }
}