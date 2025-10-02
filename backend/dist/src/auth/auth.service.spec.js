"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcryptjs");
describe('AuthService', () => {
    let service;
    let prismaService;
    let jwtService;
    const mockUser = {
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        password: 'hashedpassword',
        firstName: 'Test',
        lastName: 'User',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const mockPrismaService = {
        user: {
            findUnique: jest.fn(),
            create: jest.fn(),
        },
        refreshToken: {
            create: jest.fn(),
            findUnique: jest.fn(),
            deleteMany: jest.fn(),
        },
    };
    const mockJwtService = {
        sign: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                {
                    provide: prisma_service_1.PrismaService,
                    useValue: mockPrismaService,
                },
                {
                    provide: jwt_1.JwtService,
                    useValue: mockJwtService,
                },
            ],
        }).compile();
        service = module.get(auth_service_1.AuthService);
        prismaService = module.get(prisma_service_1.PrismaService);
        jwtService = module.get(jwt_1.JwtService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('validateUser', () => {
        it('should return user data when credentials are valid', async () => {
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
            mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
            const result = await service.validateUser('test@example.com', 'password');
            expect(result).toEqual({
                id: mockUser.id,
                email: mockUser.email,
                username: mockUser.username,
                firstName: mockUser.firstName,
                lastName: mockUser.lastName,
                isActive: mockUser.isActive,
                createdAt: mockUser.createdAt,
                updatedAt: mockUser.updatedAt,
            });
        });
        it('should return null when credentials are invalid', async () => {
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
            mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
            const result = await service.validateUser('test@example.com', 'wrongpassword');
            expect(result).toBeNull();
        });
        it('should return null when user is not found', async () => {
            mockPrismaService.user.findUnique.mockResolvedValue(null);
            const result = await service.validateUser('test@example.com', 'password');
            expect(result).toBeNull();
        });
    });
    describe('login', () => {
        it('should return access token and user data', async () => {
            const mockToken = 'mock-access-token';
            const mockRefreshToken = 'mock-refresh-token';
            mockJwtService.sign.mockReturnValue(mockToken);
            jest.spyOn(service, 'generateRefreshToken').mockResolvedValue(mockRefreshToken);
            const result = await service.login(mockUser);
            expect(result).toEqual({
                access_token: mockToken,
                refresh_token: mockRefreshToken,
                user: {
                    id: mockUser.id,
                    email: mockUser.email,
                    username: mockUser.username,
                    firstName: mockUser.firstName,
                    lastName: mockUser.lastName,
                    avatar: mockUser.avatar,
                },
            });
        });
    });
    describe('register', () => {
        it('should create a new user and return user data', async () => {
            const hashedPassword = 'hashed-password';
            jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
            mockPrismaService.user.create.mockResolvedValue(mockUser);
            const result = await service.register('test@example.com', 'password', 'testuser', 'Test', 'User');
            expect(bcrypt.hash).toHaveBeenCalledWith('password', 12);
            expect(mockPrismaService.user.create).toHaveBeenCalledWith({
                data: {
                    email: 'test@example.com',
                    password: hashedPassword,
                    username: 'testuser',
                    firstName: 'Test',
                    lastName: 'User',
                },
            });
            expect(result).toEqual({
                id: mockUser.id,
                email: mockUser.email,
                username: mockUser.username,
                firstName: mockUser.firstName,
                lastName: mockUser.lastName,
                isActive: mockUser.isActive,
                createdAt: mockUser.createdAt,
                updatedAt: mockUser.updatedAt,
            });
        });
    });
});
//# sourceMappingURL=auth.service.spec.js.map