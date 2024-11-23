# NextJS Full Stack Anonymous Messaging Platform

A production-ready anonymous messaging platform built with NextJS, featuring custom authentication, email verification, and AI-powered message generation.

## 🌟 Features

- **Custom Authentication System**
  - Email & password authentication
  - JWT token-based sessions
  - AuthJS integration
  - Email verification with OTP

- **User Management**
  - Unique username verification
  - Customizable user profiles
  - Message acceptance settings
  - User dashboard

- **Messaging System**
  - Anonymous message sending
  - Message acceptance/rejection
  - AI-powered question generation
  - Real-time validation

- **Security**
  - Zod schema validation
  - Secure password handling
  - Rate limiting
  - Protected API routes

## 🚀 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose
- **Authentication**: AuthJS (NextAuth)
- **Email**: Resend
- **Validation**: Zod
- **Forms**: React Hook Form
- **AI Integration**: Together AI

## 📦 Prerequisites

- Node.js 18+ 
- MongoDB instance
- Resend API key
- Together AI API key

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```plaintext
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

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/project-name.git
cd project-name
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Database Schema

### User Model
```typescript
interface User {
  username: string;       // Unique username
  email: string;         // Unique email address
  password: string;      // Hashed password
  verifyCode: string;    // Email verification code
  verifyCodeExpiry: Date;// Verification code expiry
  isVerified: boolean;   // Email verification status
  isAcceptingMessages: boolean; // Message acceptance setting
  messages: Message[];   // Array of messages
}
```

### Message Model
```typescript
interface Message {
  content: string;      // Message content
  createdAt: Date;      // Message timestamp
  _id: ObjectId;        // MongoDB document ID
}
```

## 🔒 API Routes

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/verify` - Email verification
- `GET /api/auth/check-username` - Username availability check

### Messages
- `POST /api/messages` - Send anonymous message
- `GET /api/messages` - Get user messages
- `PUT /api/messages/:id/accept` - Accept message
- `PUT /api/messages/:id/decline` - Decline message
- `DELETE /api/messages/:id` - Delete message

### User
- `GET /api/user/dashboard` - Get user dashboard data
- `PUT /api/user/settings` - Update user settings

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [AuthJS Documentation](https://authjs.dev)
- [Mongoose Documentation](https://mongoosejs.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Together AI](https://together.ai)
