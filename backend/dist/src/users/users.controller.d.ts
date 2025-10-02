import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<any>;
    updateProfile(req: any, updateUserDto: UpdateUserDto): Promise<any>;
    getUserStats(req: any): Promise<{
        totalSessions: number;
        lastLogin: Date;
        accountAge: number;
        activityScore: number;
    }>;
}
