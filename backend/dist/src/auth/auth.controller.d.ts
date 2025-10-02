import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
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
    register(body: {
        email: string;
        password: string;
        username: string;
        firstName?: string;
        lastName?: string;
    }): Promise<any>;
    refresh(body: {
        refresh_token: string;
    }): Promise<{
        access_token: string;
    }>;
    logout(req: any, body: {
        refresh_token: string;
    }): Promise<{
        message: string;
    }>;
    getProfile(req: any): Promise<any>;
}
