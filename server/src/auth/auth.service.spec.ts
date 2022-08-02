import {Test, TestingModule} from "@nestjs/testing";
import {AuthService} from "./auth.service";
import {PrismaService} from "../prisma/prisma.service";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import * as argon from 'argon2';
import {ServiceReturnInterface} from "../product/Interfaces/ServiceReturnInterface";
import {signUpDto} from "./dto";

describe('AuthService', () => {
    let authService: AuthService;
    let prisma: PrismaService;
    let jwt: JwtService;
    const mockToken = {
        access_token: "mockAccessToken",
    };
    const mockUserList = [
        {userId: 1, email: "mock1@email.com", password: "mockPassword"},
        {userId: 2, email: "mock2@email.com", password: "mockPassword"},
        {userId: 3, email: "mock3@email.com", password: "mockPassword"},
        {userId: 4, email: "mock4@email.com", password: "mockPassword"},
    ];
    const mockValidUser = {
        userId: 3,
        email: "mock3@email.com",
        password: "mockPassword",
    };
    const mockCreateUserData: signUpDto = {
        firstName: "mockFirstName",
        lastName: "mockLastName",
        phone: "0183948394",
        address: "mockAddress",
        email: "mockCreate@email.com",
        password: "mocCreatePassword",
    };
    const mockWrongCreateUserData: signUpDto = {
        firstName: "mockFirstName",
        lastName: "mockLastName",
        phone: "0183948394",
        address: "mockAddress",
        email: "mockWrongCreate@email.com",
        password: "mockWrongPassword"
    };
    const mockUserInvalidEmail = {
        userId: 1,
        email: "mockInvalid@email.com",
        password: "mockPassword",
    }
    const mockUserInvalidPassword = {
        userId: 1,
        email: "mock1@email.com",
        password: "mockWrongPassword",
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, PrismaService, JwtService, ConfigService],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        prisma = module.get<PrismaService>(PrismaService);
        jwt = module.get<JwtService>(JwtService);

        // mock functions
        jest.spyOn(jwt, 'signAsync').mockImplementationOnce(async (payload, options) => {
            return mockToken.access_token;
        });
        jest.spyOn(argon, 'verify').mockImplementationOnce((hashedPassword, password)=> {
            return Promise.resolve(hashedPassword === password);
        });
        prisma.user.findUnique = jest.fn().mockImplementationOnce(async (args) => {
            if(args.where.id){
                const userWithId =  mockUserList.find(user => user.userId === args.where.id);
                if(userWithId)return userWithId;
                else return null;
            }
            else if(args.where.email){
                const userWithEmail = mockUserList.find(user => user.email === args.where.email);
                if(userWithEmail)return userWithEmail;
                else return null;
            }
        });
        prisma.user.create = jest.fn().mockImplementationOnce(async (args)=>{
            if(args.data.email === mockCreateUserData.email){
                return mockCreateUserData;
            }
            else return null;
        });
    });
    it('authService should be defined', () => {
        expect(authService).toBeDefined();
    });
    it('prisma should be defined', () => {
        expect(prisma).toBeDefined();
    });
    it('signIn should be defined', () => {
        expect(authService.signIn).toBeDefined();
    });
    it('signUp should be defined', () => {
        expect(authService.signUp).toBeDefined();
    });
    it('getCurrentLoggedInUser should be defined', () => {
        expect(authService.getCurrentLoggedInUser).toBeDefined();
    });
    it('generateJWT should be defined', ()=> {
        expect(authService.generateJWT).toBeDefined();
    });
    it('generateJWT should return a token when given userId and email', async () => {
        const token = await authService.generateJWT(mockValidUser.userId, mockValidUser.password);
        expect(token).toStrictEqual(mockToken);
    });
    it('signIn should return a serviceError of type Forbidden when provided with wrong email',async ()=>{
        const expectedError: ServiceReturnInterface = {
            error: {
                type: "Forbidden",
                message: "Invalid Credentials",
            }
        };
        const resp = await authService.signIn({email: mockUserInvalidEmail.email, password: mockUserInvalidEmail.password});
        expect(resp).toStrictEqual(expectedError);
    });
    it('signIn should return a serviceError of type Forbidden when provided with wrong password',async ()=>{
        const expectedError: ServiceReturnInterface = {
            error: {
                type: "Forbidden",
                message: "Invalid Credentials",
            }
        };
        const resp = await authService.signIn({email: mockUserInvalidPassword.email, password: mockUserInvalidPassword.password});
        expect(resp).toStrictEqual(expectedError);
    });
    it('signIn should return a token when provided with valid credentials',async ()=>{
        const expectedToken: ServiceReturnInterface = {
            data: mockToken
        };
        const resp = await authService.signIn({email: mockValidUser.email, password: mockValidUser.password});
        expect(resp).toStrictEqual(expectedToken);
    });
    it('signUp should return a successfully created user', async ()=> {
        const expectedResp: ServiceReturnInterface = {
            data: mockToken
        };
        const resp = await authService.signUp(mockCreateUserData);
        expect(resp).toStrictEqual(expectedResp);
    });
    it('getCurrentLoggedInUser should return an error of type Forbidden if provided a wrong userId', async ()=> {
        const expectedResp: ServiceReturnInterface = {
            error: {
                type: "Forbidden",
                message: "Invalid Credentials",
            }
        };
        const resp = await authService.getCurrentLoggedInUser(56);
        expect(resp).toStrictEqual(expectedResp);
    });
    it('getCurrentLoggedInUser should return currently logged in user', async ()=> {
        const expectedResp: ServiceReturnInterface = {
            data: mockUserList[0]
        };
        const resp = await authService.getCurrentLoggedInUser(1);
        expect(resp).toStrictEqual(expectedResp);
    });
});
