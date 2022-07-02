import {Body, Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import {signInDto, signUpDto} from "./dto";
import {AuthService} from "./auth.service";
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {

    constructor(private AuthService: AuthService) {}

    @Post('/signin')
    async signInLocal(@Body() dto: signInDto) {
        return this.AuthService.signIn(dto);
    }

    @Post ('/signup')
    async signUpLocal(@Body() dto: signUpDto) {
        return this.AuthService.signUp(dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/current-loggedin-user/')
    async getCurrentLoggedInUser(@Request() req) {
        return this.AuthService.getCurrentLoggedInUser(req.user.userId);
    }
}