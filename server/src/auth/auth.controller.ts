import {Body, Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import {signInDto, signUpDto} from "./dto";
import {AuthService} from "./auth.service";
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {

    constructor(private AuthService: AuthService) {}

    @Post('/local/signin')
    async signInLocal(@Body() dto: signInDto) {
        return this.AuthService.signInLocal(dto);
    }
    @Post ('/local/signup')
    async signUpLocal(@Body() dto: signUpDto) {
        return this.AuthService.signUpLocal(dto);
    }
}
