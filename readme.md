# Backend Authentication System

A RESTful backend application built using Node.js, Express, and MongoDB with JWT-based authentication and middleware architecture.

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT (Authentication)
- bcrypt (Password hashing)

## Features
- User Registration & Login
- JWT-based Authentication
- Protected Routes
- Middleware-based Architecture
- Centralized Error Handling

## Folder Structure

src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middlewares/
 ├── config/

 ## API Endpoints

### Auth Routes
- POST /api/auth/register
- POST /api/auth/login

### User Routes
- GET /api/users/profile (Protected)

## Authentication Flow

1. User registers → data stored in DB
2. User logs in → JWT token generated
3. Token sent in headers for protected routes
4. Middleware verifies token and allows access
