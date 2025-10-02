"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const app_module_1 = require("../src/app.module");
const prisma_service_1 = require("../src/prisma/prisma.service");
describe('AuthController (e2e)', () => {
    let app;
    let prismaService;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        prismaService = moduleFixture.get(prisma_service_1.PrismaService);
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    beforeEach(async () => {
        await prismaService.user.deleteMany();
        await prismaService.refreshToken.deleteMany();
    });
    describe('/auth/register (POST)', () => {
        it('should register a new user', () => {
            return request(app.getHttpServer())
                .post('/auth/register')
                .send({
                email: 'test@example.com',
                password: 'password123',
                username: 'testuser',
                firstName: 'Test',
                lastName: 'User',
            })
                .expect(201)
                .expect((res) => {
                expect(res.body).toHaveProperty('user');
                expect(res.body.user.email).toBe('test@example.com');
                expect(res.body.user.username).toBe('testuser');
            });
        });
        it('should not register user with duplicate email', async () => {
            await request(app.getHttpServer())
                .post('/auth/register')
                .send({
                email: 'test@example.com',
                password: 'password123',
                username: 'testuser',
            });
            return request(app.getHttpServer())
                .post('/auth/register')
                .send({
                email: 'test@example.com',
                password: 'password123',
                username: 'testuser2',
            })
                .expect(400);
        });
    });
    describe('/auth/login (POST)', () => {
        beforeEach(async () => {
            await request(app.getHttpServer())
                .post('/auth/register')
                .send({
                email: 'test@example.com',
                password: 'password123',
                username: 'testuser',
            });
        });
        it('should login with valid credentials', () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({
                email: 'test@example.com',
                password: 'password123',
            })
                .expect(200)
                .expect((res) => {
                expect(res.body).toHaveProperty('access_token');
                expect(res.body).toHaveProperty('refresh_token');
                expect(res.body).toHaveProperty('user');
                expect(res.body.user.email).toBe('test@example.com');
            });
        });
        it('should not login with invalid credentials', () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({
                email: 'test@example.com',
                password: 'wrongpassword',
            })
                .expect(401);
        });
    });
    describe('/auth/refresh (POST)', () => {
        let refreshToken;
        beforeEach(async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                email: 'test@example.com',
                password: 'password123',
            });
            refreshToken = response.body.refresh_token;
        });
        it('should refresh access token with valid refresh token', () => {
            return request(app.getHttpServer())
                .post('/auth/refresh')
                .send({
                refresh_token: refreshToken,
            })
                .expect(200)
                .expect((res) => {
                expect(res.body).toHaveProperty('access_token');
            });
        });
        it('should not refresh with invalid refresh token', () => {
            return request(app.getHttpServer())
                .post('/auth/refresh')
                .send({
                refresh_token: 'invalid-token',
            })
                .expect(401);
        });
    });
});
//# sourceMappingURL=auth.e2e-spec.js.map