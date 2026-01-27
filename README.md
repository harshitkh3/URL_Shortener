# URL Shortener Application

A full-stack web application that allows users to create shortened URLs, track analytics, and manage their links. Built with **Node.js**, **Express**, **MongoDB**, and **EJS** templating.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- **User Authentication**: Secure user registration and login system with JWT tokens
- **URL Shortening**: Generate unique short IDs for long URLs using nanoid
- **URL Redirection**: Redirect short URLs to their original long URLs
- **Analytics Tracking**: Track visit history and count for each shortened URL
- **User Dashboard**: View all created short links and their statistics
- **Cookie-based Sessions**: Secure session management with cookies
- **Responsive UI**: EJS-based templates for a clean user interface

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Frontend**: EJS (Embedded JavaScript Templating), HTML, CSS
- **Authentication**: JWT (JSON Web Tokens)
- **Utilities**:
  - nanoid: For generating short unique IDs
  - uuid: For unique identifiers
  - moment-timezone: For timezone-aware timestamps
  - cookie-parser: For handling cookies
  - nodemon: For development server hot-reload

---

## 📁 Project Structure

```
URL_Shortener/
├── index.js                 # Main server entry point
├── package.json            # Project dependencies and metadata
├── README.md              # Project documentation
│
├── controllers/           # Business logic handlers
│   ├── url.js            # URL generation, analytics, data retrieval
│   └── user.js           # User signup and login handlers
│
├── models/               # MongoDB schema definitions
│   ├── user.js          # URL document schema
│   └── details.js       # User document schema
│
├── routes/              # API route definitions
│   ├── url.js          # URL shortening and analytics routes
│   ├── user.js         # User authentication routes
│   └── staticRouter.js  # Static page routes
│
├── middlewares/        # Custom middleware functions
│   └── auth.js        # Authentication and authorization checks
│
├── service/           # Service layer
│   └── auth.js       # JWT token generation and verification
│
└── views/            # EJS template files
    ├── home.ejs      # Home/dashboard page
    ├── login.ejs     # Login page
    └── signup.ejs    # User registration page
```

---

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on `mongodb://localhost:27017` or update connection string)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshitkh3/URL_Shortener.git
   cd URL_Shortener
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Ensure MongoDB is running**
   ```bash
   # On Windows, make sure MongoDB service is running
   # Or start it manually with mongod
   ```

---

## ⚙️ Configuration

### Database Connection

The application connects to MongoDB at `mongodb://localhost:27017/short-URL` by default.

To modify the connection string, edit index.js line 28:

```javascript
mongoose.connect('mongodb://localhost:27017/short-URL')
```

### Port Configuration

The server runs on **Port 8000** by default. Modify in index.js:

```javascript
const PORT = 8000;
```

---

## ▶️ Running the Application

1. **Start the development server** (with auto-reload)
   ```bash
   npm start
   ```

2. **Access the application**
   Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

---

## 🔌 API Endpoints

### User Routes (`/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/signup` | Register a new user | No |
| POST | `/user/login` | Login with email and password | No |

### URL Routes (`/url`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/url/` | Create a new shortened URL | Yes |
| GET | `/url/analytics/:shortID` | Get visit analytics for a URL | Yes |
| GET | `/url/data` | Get all URLs created by user | Yes |

### Redirect Route

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/:shortid` | Redirect to original URL (tracks visit) |

---

## 📊 Database Models

### URL Model (models/user.js)

```javascript
{
  shortID: String (unique, required),
  redirectedURL: String (required),
  visitHistory: [
    {
      timestamp: Number
    }
  ],
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### User Model (models/details.js)

```javascript
{
  name: String (required),
  email: String (unique, required),
  password: String (required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## 💡 Usage

### 1. Sign Up
- Navigate to the signup page
- Enter your name, email, and password
- Submit to create an account

### 2. Log In
- Enter your email and password
- Upon successful login, receive a JWT token in a cookie

### 3. Create Short URL
- Submit a long URL through the form
- Receive a shortened URL with a unique 8-character ID
- Share the short URL: `http://localhost:8000/{shortID}`

### 4. Track Analytics
- View the number of visits to each short URL
- See complete visit history with timestamps

### 5. View All URLs
- Access your dashboard to see all shortened URLs you've created
- Monitor traffic for each link

---

## 🔐 Authentication & Security

- Passwords are stored in the database (consider using bcrypt for production)
- JWT tokens are issued upon successful login
- Tokens are stored in HTTP cookies for session management
- Protected routes require valid authentication tokens
- `restrictToLoggedInUserOnly` middleware enforces authorization

---

## 📝 File Descriptions

- **index.js**: Server initialization, middleware setup, MongoDB connection, main redirect logic
- **controllers/url.js**: Handles URL creation, analytics retrieval, and data fetching
- **controllers/user.js**: Manages user signup and login
- **middlewares/auth.js**: Authentication middleware for protected routes
- **service/auth.js**: JWT token creation and verification logic
- **routes/url.js**: Defines URL-related API routes
- **routes/user.js**: Defines user authentication routes
- **routes/staticRouter.js**: Serves static pages (home, login, signup)

---

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB service is running
- Check connection string in index.js
- Verify database name `short-URL` exists

**Port Already in Use**
- Change the PORT constant in index.js
- Or kill the process using port 8000

**Nodemon Not Working**
- Ensure nodemon is installed: `npm install nodemon --save-dev`
- Run with `npm start`

---

## 🚀 Future Enhancements

- [ ] Add password hashing (bcrypt)
- [ ] Implement email verification
- [ ] Add custom short URL slugs
- [ ] QR code generation for short URLs
- [ ] Advanced analytics dashboard with charts
- [ ] URL expiration functionality
- [ ] Rate limiting for API endpoints
- [ ] User profile management
- [ ] Admin dashboard

---

## 📄 License

This project is licensed under the **ISC License**. See package.json for details.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact

For questions or issues, please create an issue on [GitHub Issues](https://github.com/harshitkh3/URL_Shortener/issues).

---

**Happy URL Shortening!** 🎉
