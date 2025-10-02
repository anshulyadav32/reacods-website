import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('stats')
  async getDashboardStats(@Request() req) {
    return this.dashboardService.getDashboardStats(req.user.id);
  }

  @Get('activity')
  async getRecentActivity(@Request() req) {
    return this.dashboardService.getRecentActivity(req.user.id);
  }

  @Get('notifications')
  async getNotifications(@Request() req) {
    return this.dashboardService.getNotifications(req.user.id);
  }
}
