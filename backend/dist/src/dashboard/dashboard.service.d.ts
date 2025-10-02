export declare class DashboardService {
    getDashboardStats(userId: string): Promise<{
        totalUsers: number;
        activeSessions: number;
        totalMessages: number;
        totalLikes: number;
        userStats: {
            loginCount: number;
            lastLogin: Date;
            accountAge: number;
        };
    }>;
    getRecentActivity(userId: string): Promise<{
        id: string;
        type: string;
        message: string;
        timestamp: Date;
        icon: string;
        color: string;
    }[]>;
    getNotifications(userId: string): Promise<{
        id: string;
        title: string;
        message: string;
        type: string;
        read: boolean;
        timestamp: Date;
    }[]>;
}
