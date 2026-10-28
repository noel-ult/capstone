# SkillSwap - Community Skill Exchange Platform

<!-- documentation-navigation -->
[Developer guide](docs/PROJECT_GUIDE.md) · [Source reference](docs/REFERENCE.md) · [Contributing](CONTRIBUTING.md)
<!-- /documentation-navigation -->


A full-stack MERN application that connects people who want to share skills and learn from each other.

## 🚀 Features

- **User Authentication**: Secure signup/login with JWT tokens
- **Profile Management**: Create and edit user profiles with bio, skills offered, and skills wanted
- **Skill Management**: Add, edit, and delete skills with categories and skill levels
- **Search Functionality**: Find users by skills, categories, or keywords
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Dynamic skill statistics and search results

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Database with Mongoose ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Context** - State management
- **Lucide React** - Icons
- **React Toastify** - Notifications

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### 1. Clone the repository
```bash
git clone https://github.com/noel-ult/capstone.git
cd skillswap
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/skillswap?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. MongoDB Setup
1. Create a MongoDB Atlas account at https://mongodb.com/atlas
2. Create a new cluster
3. Create a database user
4. Get your connection string and update the `MONGO_URI` in your `.env` file

## 🚀 Running the Application

### Development Mode

1. **Start the backend server:**
```bash
cd backend
npm run dev
```
The backend will run on http://localhost:5000

2. **Start the frontend development server:**
```bash
cd frontend
npm start
```
The frontend will run on http://localhost:3000

### Production Mode

1. **Build the frontend:**
```bash
cd frontend
npm run build
```

2. **Start the production server:**
```bash
cd backend
NODE_ENV=production npm start
```

The entire application will be served from http://localhost:5000

## 📱 Usage

### Getting Started
1. **Sign Up**: Create a new account with your name, email, and password
2. **Complete Profile**: Add your bio, location, and avatar
3. **Add Skills**: 
   - Add skills you can offer (with skill level)
   - Add skills you want to learn
4. **Search & Connect**: Find other users with complementary skills
5. **Start Learning**: Contact other members to begin skill exchanges

### User Roles
- **Skill Providers**: Users who offer skills and want to teach
- **Skill Seekers**: Users who want to learn new skills
- **Both**: Most users both offer and seek different skills

## 🔧 API Endpoints

### Authentication
- `POST /api/users/signup` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile

### Skills
- `GET /api/skills` - Get all skills (with filtering)
- `POST /api/skills` - Create new skill
- `GET /api/skills/:id` - Get skill by ID
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill (soft delete)
- `GET /api/skills/search` - Search skills
- `GET /api/skills/my` - Get current user's skills

### Users
- `GET /api/users/search` - Search users
- `GET /api/users/:id` - Get user by ID

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation and sanitization
- Protected API routes
- Error handling middleware
- Environment variable configuration

## 📝 Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Database
MONGO_URI=your_mongodb_connection_string

# Server
PORT=5000
NODE_ENV=development

# Authentication
JWT_SECRET=your_very_long_and_secure_jwt_secret_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **SkillSwap Team** - *Initial work*

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- React community for excellent documentation
- Express.js for the robust backend framework
- All contributors and users of SkillSwap

## 🐛 Known Issues

- Avatar upload currently accepts URLs only (file upload feature planned)
- Real-time chat feature is planned for future releases
- Skill endorsements/ratings system is under development

## 🔮 Future Enhancements

- [ ] Real-time messaging system
- [ ] Skill endorsements and ratings
- [ ] Video call integration
- [ ] Mobile app development
- [ ] Advanced matching algorithm
- [ ] Skill verification system
- [ ] Community forums
- [ ] Achievement system

---

For support or questions, please create an issue in the repository.

<!-- developer-handbook-20261028 -->
[Developer guide](docs/PROJECT_GUIDE.md) · [Source reference](docs/REFERENCE.md) · [Verification and operations](docs/OPERATIONS.md)
<!-- /developer-handbook-20261028 -->
