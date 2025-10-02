import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<any>;
    updateProfile(userId: string, updateData: any): Promise<any>;
    getUserStats(userId: string): Promise<{
        totalSessions: number;
        lastLogin: Date;
        accountAge: number;
        activityScore: number;
    }>;
}
