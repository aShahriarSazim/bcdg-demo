import {Body, Controller, Get, Post, UseGuards, Request, ForbiddenException, NotFoundException} from '@nestjs/common';
import {signInDto, signUpDto} from "./dto";
import {AuthService} from "./auth.service";
import {AuthGuard} from "@nestjs/passport";
import {ServiceReturnInterface} from "../product/Interfaces/ServiceReturnInterface";

@Controller('auth')
export class AuthController {

    constructor(private AuthService: AuthService) {}

    @Post('/signin')
    async signIn(@Body() dto: signInDto) {
        const resp: ServiceReturnInterface = await this.AuthService.signIn(dto);
        if(resp.error){
            if(resp.error.type === "Forbidden"){
                throw new ForbiddenException(resp.error.message);
            }
            else if(resp.error.type === "NotFound"){
                throw new NotFoundException(resp.error.message);
            }
        }
        return resp.data;
    }

    @Post('/signup')
    async signUp(@Body() dto: signUpDto) {
        const resp: ServiceReturnInterface = await this.AuthService.signUp(dto);
        if(resp.error){
            if(resp.error.type === "Forbidden"){
                throw new ForbiddenException(resp.error.message);
            }
            else if(resp.error.type === "NotFound"){
                throw new NotFoundException(resp.error.message);
            }
        }
        return resp.data;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/current-loggedin-user/')
    async getCurrentLoggedInUser(@Request() req) {
        const resp: ServiceReturnInterface = await this.AuthService.getCurrentLoggedInUser(req.user.userId);
        if(resp.error){
            if(resp.error.type === "Forbidden"){
                throw new ForbiddenException(resp.error.message);
            }
            else if(resp.error.type === "NotFound"){
                throw new NotFoundException(resp.error.message);
            }
        }
        return resp.data;
    }
}
