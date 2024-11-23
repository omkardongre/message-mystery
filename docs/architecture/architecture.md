# Application Architecture 🏗️

## System Overview 📋

```mermaid
flowchart TB
    subgraph Client["Client Layer"]
        UI[/"User Interface\n(Next.js Pages)"/]
        Components["React Components"]
        Forms["Forms & Validation"]
    end

    subgraph Server["Server Layer (Next.js API)"]
        API["API Routes"]
        Auth["Auth Service"]
        MessageService["Message Service"]
        UserService["User Service"]
        AIService["AI Service"]
    end

    subgraph External["External Services"]
        MongoDB[(MongoDB)]
        TogetherAI["Together AI"]
        Resend["Resend Email"]
    end

    Client --> Server
    Server --> External
    Forms --> API
    UI --> Components
    Components --> API
    API --> Auth
    API --> MessageService
    API --> UserService
    API --> AIService
    Auth --> MongoDB
    MessageService --> MongoDB
    UserService --> MongoDB
    AIService --> TogetherAI
    Auth --> Resend
```

## Authentication Flow 🔐

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant A as Auth API
    participant DB as Database
    participant E as Email Service

    U->>C: Enter Credentials
    C->>A: POST /api/auth/signup
    A->>DB: Check User Exists
    A->>DB: Create User
    A->>E: Send OTP Email
    E-->>U: Receive OTP
    U->>C: Enter OTP
    C->>A: POST /api/auth/verify
    A->>DB: Update Verification Status
    A-->>C: Return JWT Token
    C-->>U: Redirect to Dashboard
```

## Technology Stack 🛠️

| Layer          | Technologies                                                                                                                                                                                                                                                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend       | ![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) |
| Styling        | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Shadcn/ui](https://img.shields.io/badge/Shadcn/ui-000000?style=for-the-badge)                                                                                                                      |
| Backend        | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)                                                                                                            |
| Authentication | ![Auth.js](https://img.shields.io/badge/Auth.js-000000?style=for-the-badge) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)                                                                                                                                         |
| Tools          | ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)                                                                                                                           |

## Project Structure 📁

```
├── src/
│   ├── app/                 # Next.js 13+ App Router
│   │   ├── api/            # API Routes
│   │   │   ├── auth/       # Auth Endpoints
│   │   │   ├── messages/   # Message Endpoints
│   │   │   └── user/       # User Endpoints
│   │   ├── (auth)/         # Auth Pages
│   │   ├── dashboard/      # Dashboard Pages
│   │   └── messages/       # Message Pages
│   ├── components/
│   │   ├── ui/            # Shadcn Components
│   │   ├── auth/          # Auth Components
│   │   └── messages/      # Message Components
│   ├── lib/
│   │   ├── db.ts          # Database Config
│   │   ├── auth.ts        # Auth Utils
│   │   └── api.ts         # API Utils
│   └── types/             # TypeScript Types
└── public/                # Static Assets
```

## Database Schema 💾

### User Model

```typescript
interface User {
  username: string; // Unique username
  email: string; // Unique email address
  password: string; // Hashed password
  verifyCode: string; // Email verification code
  verifyCodeExpiry: Date; // Verification code expiry
  isVerified: boolean; // Email verification status
  isAcceptingMessages: boolean; // Message acceptance setting
  messages: Message[]; // Array of messages
}
```

### Message Model

```typescript
interface Message {
  content: string; // Message content
  createdAt: Date; // Message timestamp
  _id: ObjectId; // MongoDB document ID
}
```

## API Routes 🛣️

### Authentication Endpoints

| Method | Endpoint                   | Description                 |
| ------ | -------------------------- | --------------------------- |
| POST   | `/api/auth/signup`         | Register new user           |
| POST   | `/api/auth/signin`         | User login                  |
| POST   | `/api/auth/verify`         | Verify email OTP            |
| GET    | `/api/auth/check-username` | Check username availability |

### Message Endpoints

| Method | Endpoint                   | Description            |
| ------ | -------------------------- | ---------------------- |
| POST   | `/api/messages`            | Send anonymous message |
| GET    | `/api/messages`            | Get user messages      |
| PUT    | `/api/messages/:id/accept` | Accept message         |
| DELETE | `/api/messages/:id`        | Delete message         |

## Security Measures 🔒

- ✅ JWT token authentication
- ✅ Password hashing with bcrypt
- ✅ Email verification
- ✅ Rate limiting
- ✅ Input validation with Zod
- ✅ XSS protection
- ✅ CORS configuration
- ✅ Secure HTTP headers

## Environment Variables 🔑

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Email (Resend)
RESEND_API_KEY=your_resend_api_key

# AI Service
TOGETHER_API_KEY=your_together_api_key
```

## Performance Optimizations 🚀

- ✅ Server-side rendering with Next.js
- ✅ API route caching
- ✅ MongoDB indexing
- ✅ Image optimization
- ✅ Code splitting
- ✅ Bundle optimization

## Future Roadmap 🗺️

1. **Real-time Features**

   - WebSocket integration
   - Live notifications
   - Message typing indicators

2. **Enhanced Security**

   - Two-factor authentication
   - Advanced rate limiting
   - Audit logging

3. **Performance**

   - Redis caching
   - CDN integration
   - Edge functions

4. **Features**
   - Message threads
   - Rich text editor
   - Media attachments
   - User blocking

## Contributing 🤝

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
