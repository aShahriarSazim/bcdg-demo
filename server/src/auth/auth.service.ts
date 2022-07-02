import {ForbiddenException, Injectable} from '@nestjs/common';
import {signInDto, signUpDto} from "./dto";
import {PrismaService} from "../prisma/prisma.service";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

import * as argon from 'argon2';
import {PrismaClientKnownRequestError} from "prisma/prisma-client/runtime";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async signIn(dto: signInDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        });
        if(!user)throw new ForbiddenException('Invalid Credentials');
        const isValid = await argon.verify(user.password, dto.password);
        if(!isValid)throw new ForbiddenException('Invalid Credentials');

        return await this.generateJWT(user.id, user.email);
    }
    async signUp(dto: signUpDto) {
        const hashedPassword = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    email: dto.email,
                    phone: dto.phone,
                    address: dto.address,
                    password: hashedPassword,
                }
            });
            return await this.generateJWT(user.id, user.email);
        }catch (e) {

            if (e.code === 'P2002') {
                throw new ForbiddenException(e.meta.target);
            }
            throw new ForbiddenException(e);
        }
    }

    async generateJWT(userId: number, email: string) {
        const payload = {
            userId,
            email
        }
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '1h',
            secret: secret
        });
        return {
            access_token: token
        };
    }

    async getCurrentLoggedInUser(userId) {
        try {
            return await this.prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    address: true
                }
            });
        }catch(e){
            throw new ForbiddenException('Invalid Credentials');
        }
    }
}
