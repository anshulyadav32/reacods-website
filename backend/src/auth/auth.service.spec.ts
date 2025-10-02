import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data when credentials are valid', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
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
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);
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
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);
      mockPrismaService.user.create.mockResolvedValue(mockUser);

      const result = await service.register(
        'test@example.com',
        'password',
        'testuser',
        'Test',
        'User'
      );

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

