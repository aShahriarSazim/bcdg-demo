import { Test, TestingModule } from "@nestjs/testing";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {PrismaService} from "../prisma/prisma.service";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {ServiceReturnInterface} from "../product/Interfaces/ServiceReturnInterface";
import {signInDto, signUpDto} from "./dto";

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;
    const mockSignInData: signInDto = {
        email: "mock@email.com",
        password: "mockPassword"
    };
    const mockSignUpData: signUpDto = {
        firstName: "mockFirstName",
        lastName: "mockLastName",
        email: "mock@email.com",
        phone: "01700000000",
        address: "mockAddress",
        password: "mockPassword"
    };
    const mockTokenData = {
        access_token: "mockAccessToken",
    };
    const mockUser = {
        id: 1,
        firstName: "mockFirstName",
        lastName: "mockLastName",
        email: "mock@email.com",
        phone: "01700000000",
        address: "mockAddress"
    }
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService, PrismaService, JwtService, ConfigService],
        }).compile();
        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });
    it('authController should be defined', ()=> {
        expect(authController).toBeDefined();
    });
    it('authService should be defined', ()=> {
        expect(authService).toBeDefined();
    });
    it('signIn should be defined', ()=> {
        expect(authController.signIn).toBeDefined();
    });
    it('signUp should be defined', ()=> {
        expect(authController.signUp).toBeDefined();
    });
    it('getCurrentLoggedInUser should be defined', ()=> {
        expect(authController.getCurrentLoggedInUser).toBeDefined();
    });

    it('signIn should throw a ForbiddenException when service returns an error of type Forbidden', async () => {
        const forbiddenError: ServiceReturnInterface = {
            error: {
                type: "Forbidden",
                message: "Forbidden error"
            }
        };
        jest.spyOn(authService, 'signIn').mockImplementation(async (dto: signInDto)=> {
            return forbiddenError;
        });
        try{
            const resp = await authController.signIn(mockSignInData);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(403);
            expect(e.response.message).toBe(forbiddenError.error.message);
        }
    });
    it('signIn should throw a NotFoundException when service returns an error of type NotFound', async () => {
        const notFoundError: ServiceReturnInterface = {
            error: {
                type: "NotFound",
                message: "NotFound error"
            }
        };
        jest.spyOn(authService, 'signIn').mockImplementation(async (dto: signInDto)=> {
            return notFoundError;
        });
        try{
            const resp = await authController.signIn(mockSignInData);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(404);
            expect(e.response.message).toBe(notFoundError.error.message);
        }
    });
    it('signIn should return an access token', async () => {
        const accessToken: ServiceReturnInterface = {
            data: mockTokenData
        };
        jest.spyOn(authService, 'signIn').mockImplementation(async (dto: signInDto)=> {
            return accessToken;
        });
        try{
            const resp = await authController.signIn(mockSignInData);
            expect(resp).toBe(accessToken.data);
        }catch(e){
            expect(e).toBeUndefined();
        }
    });

    it('signUp should throw a ForbiddenException when service returns an error of type Forbidden', async () => {
        const forbiddenError: ServiceReturnInterface = {
            error: {
                type: "Forbidden",
                message: "Forbidden error"
            }
        };
        jest.spyOn(authService, 'signUp').mockImplementation(async (dto: signUpDto)=> {
            return forbiddenError;
        });
        try{
            const resp = await authController.signUp(mockSignUpData);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(403);
            expect(e.response.message).toBe(forbiddenError.error.message);
        }
    });
    it('signUp should throw a NotFoundException when service returns an error of type NotFound', async () => {
        const notFoundError: ServiceReturnInterface = {
            error: {
                type: "NotFound",
                message: "NotFound error"
            }
        };
        jest.spyOn(authService, 'signUp').mockImplementation(async (dto: signUpDto)=> {
            return notFoundError;
        });
        try{
            const resp = await authController.signUp(mockSignUpData);
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(404);
            expect(e.response.message).toBe(notFoundError.error.message);
        }
    });
    it('signUp should return an access token', async () => {
        const accessToken: ServiceReturnInterface = {
            data: mockTokenData
        };
        jest.spyOn(authService, 'signUp').mockImplementation(async (dto: signUpDto)=> {
            return accessToken;
        });
        try{
            const resp = await authController.signUp(mockSignUpData);
            expect(resp).toBe(accessToken.data);
        }catch(e){
            expect(e).toBeUndefined();
        }
    });

    it('getCurrentLoggedInUser should throw a ForbiddenException when service returns an error of type Forbidden', async () => {
        const forbiddenError: ServiceReturnInterface = {
            error: {
                type: "Forbidden",
                message: "Forbidden error"
            }
        };
        jest.spyOn(authService, 'getCurrentLoggedInUser').mockImplementation(async (userId: number)=> {
            return forbiddenError;
        });
        try{
            const resp = await authController.getCurrentLoggedInUser({user: {userId: 1}});
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(403);
            expect(e.response.message).toBe(forbiddenError.error.message);
        }
    });
    it('getCurrentLoggedInUser should throw a NotFoundException when service returns an error of type NotFound', async () => {
        const notFoundError: ServiceReturnInterface = {
            error: {
                type: "NotFound",
                message: "NotFound error"
            }
        };
        jest.spyOn(authService, 'getCurrentLoggedInUser').mockImplementation(async (userId: number)=> {
            return notFoundError;
        });
        try{
            const resp = await authController.getCurrentLoggedInUser({user: {userId: 1}});
            expect(resp).toBeUndefined();
        }catch(e){
            expect(e.response.statusCode).toBe(404);
            expect(e.response.message).toBe(notFoundError.error.message);
        }
    });
    it('getCurrentLoggedInUser should return an user', async () => {
        const user: ServiceReturnInterface = {
            data: mockUser
        };
        jest.spyOn(authService, 'getCurrentLoggedInUser').mockImplementation(async (userId: number)=> {
            return user;
        });
        try{
            const resp = await authController.getCurrentLoggedInUser({user: {userId: 1}});
            expect(resp).toBe(user.data);
        }catch(e){
            expect(e).toBeUndefined();
        }
    });

});
