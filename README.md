# Data Website Domain DNS - Website Management Platform

A comprehensive website management platform built with modern technologies, featuring domain management, DNS tracking, and website analytics with authentication and real-time communication.

## 🚀 Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **PostgreSQL** - Primary database
- **Prisma** - Modern ORM
- **Redis** - Caching and Pub/Sub
- **JWT + Refresh Tokens** - Authentication
- **Passport.js** - OAuth integration
- **Socket.IO** - Real-time communication
- **Docker Compose** - Containerization
- **PM2** - Process management

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **ShadCN/UI** - Component library
- **Zustand** - State management
- **React Query** - Server state management
- **Socket.IO Client** - Real-time features

### Testing
- **Jest** - Unit testing
- **React Testing Library** - Component testing
- **Playwright** - E2E testing
- **Supertest** - API testing

### Deployment
- **Vercel** - Frontend deployment
- **Docker** - Containerization
- **PM2** - Process management

## 📁 Project Structure

```
data-website-domin-dns/
├── backend/                 # NestJS API (Port 5050)
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── prisma/         # Database service
│   │   ├── websockets/     # Real-time features
│   │   └── common/         # Shared utilities
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── Dockerfile
│   └── ecosystem.config.js # PM2 configuration
├── frontend/               # Next.js application (Port 4040)
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── stores/         # Zustand stores
│   │   └── components/     # React components
│   └── Dockerfile
├── docker-compose.yml      # Multi-service setup
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (or use Docker)
- Redis (or use Docker)

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd record-repo

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Configuration

Create environment files:

**Backend (.env):**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/record_repo_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-here"
REDIS_HOST="localhost"
REDIS_PORT=6379
NODE_ENV="development"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

### 3. Database Setup

```bash
# Generate Prisma client
cd backend
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 4. Development Mode

**Option A: Using Docker Compose (Recommended)**
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

**Option B: Manual Setup**
```bash
# Terminal 1: Start Redis
redis-server

# Terminal 2: Start PostgreSQL
# (Use your preferred method)

# Terminal 3: Start Backend
cd backend
npm run start:dev

# Terminal 4: Start Frontend
cd frontend
npm run dev
```

### 5. Production Deployment

```bash
# Build and start with PM2
cd backend
npm run build
pm2 start ecosystem.config.js

# Or use Docker
docker-compose -f docker-compose.prod.yml up -d
```

## 🔐 Authentication Features

- **JWT Access Tokens** (15min expiry)
- **Refresh Tokens** (7 days expiry)
- **OAuth Integration** (Google, GitHub)
- **Password Hashing** (bcrypt)
- **Session Management**

## 🔄 Real-time Features

- **Socket.IO Integration**
- **Room-based Chat**
- **User Presence**
- **Typing Indicators**
- **Notifications**

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test
npm run test:e2e

# Frontend tests
cd frontend
npm run test
npm run test:e2e
```

## 📊 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - User logout
- `GET /auth/profile` - Get user profile

### WebSocket Events
- `join_room` - Join a chat room
- `leave_room` - Leave a chat room
- `send_message` - Send a message
- `user_typing` - Typing indicator

## 🚀 Deployment

### Vercel (Frontend)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Backend (Docker)
1. Build the Docker image
2. Push to container registry
3. Deploy to your preferred platform

## 🔧 Development Scripts

```bash
# Backend
npm run start:dev    # Development server
npm run build       # Build for production
npm run start:prod  # Production server
npm run test        # Run tests

# Frontend
npm run dev         # Development server
npm run build       # Build for production
npm run start       # Production server
npm run test        # Run tests
```

## 📝 Database Schema

The application uses Prisma with PostgreSQL. Key models include:

- **User** - User accounts and profiles
- **Account** - OAuth provider accounts
- **Session** - User sessions
- **RefreshToken** - JWT refresh tokens

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code examples

---

**Built with ❤️ using modern web technologies**