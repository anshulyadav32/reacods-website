"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
let DashboardService = class DashboardService {
    async getDashboardStats(userId) {
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
    async getRecentActivity(userId) {
        return [
            {
                id: '1',
                type: 'login',
                message: 'You logged in successfully',
                timestamp: new Date(Date.now() - 2 * 60 * 1000),
                icon: 'login',
                color: 'indigo',
            },
            {
                id: '2',
                type: 'profile_update',
                message: 'System updated your profile',
                timestamp: new Date(Date.now() - 60 * 60 * 1000),
                icon: 'check',
                color: 'green',
            },
            {
                id: '3',
                type: 'message',
                message: 'New message received from support',
                timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
                icon: 'message',
                color: 'blue',
            },
        ];
    }
    async getNotifications(userId) {
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
                timestamp: new Date(Date.now() - 30 * 60 * 1000),
            },
        ];
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)()
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map