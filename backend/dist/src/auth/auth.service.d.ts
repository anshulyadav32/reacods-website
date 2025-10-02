import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: any;
            email: any;
            username: any;
            firstName: any;
            lastName: any;
            avatar: any;
        };
    }>;
    register(email: string, password: string, username: string, firstName?: string, lastName?: string): Promise<any>;
    refreshToken(refreshToken: string): Promise<{
        access_token: string;
    }>;
    private generateRefreshToken;
    logout(refreshToken: string): Promise<void>;
}
