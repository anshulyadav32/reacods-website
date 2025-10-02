import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboardStats(req: any): Promise<{
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
    getRecentActivity(req: any): Promise<{
        id: string;
        type: string;
        message: string;
        timestamp: Date;
        icon: string;
        color: string;
    }[]>;
    getNotifications(req: any): Promise<{
        id: string;
        title: string;
        message: string;
        type: string;
        read: boolean;
        timestamp: Date;
    }[]>;
}
