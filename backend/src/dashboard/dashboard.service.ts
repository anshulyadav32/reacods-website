import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  async getDashboardStats(userId: string) {
    // Mock data - in a real application, this would query the database
    return {
      totalUsers: 1234,
      activeSessions: 89,
      totalMessages: 2456,
      totalLikes: 5678,
      userStats: {
        loginCount: 15,
        lastLogin: new Date(),
        accountAge: Math.floor((Date.now() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24)),
      },
    };
  }

  async getRecentActivity(userId: string) {
    // Mock data - in a real application, this would query activity logs
    return [
      {
        id: '1',
        type: 'login',
        message: 'You logged in successfully',
        timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
        icon: 'login',
        color: 'indigo',
      },
      {
        id: '2',
        type: 'profile_update',
        message: 'System updated your profile',
        timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        icon: 'check',
        color: 'green',
      },
      {
        id: '3',
        type: 'message',
        message: 'New message received from support',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        icon: 'message',
        color: 'blue',
      },
    ];
  }

  async getNotifications(userId: string) {
    // Mock data - in a real application, this would query notifications
    return [
      {
        id: '1',
        title: 'Welcome to Record Repo!',
        message: 'Your account has been successfully created.',
        type: 'success',
        read: false,
        timestamp: new Date(),
      },
      {
        id: '2',
        title: 'Security Alert',
        message: 'A new login was detected from your account.',
        type: 'warning',
        read: false,
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      },
    ];
  }
}
