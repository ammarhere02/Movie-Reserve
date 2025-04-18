# Movie-Reservation System
## Description
A Node.js based API service for movie reservation system with admin user management.


RESTful API service with Swagger documentation for user management and admin access control.

## Features

- User Authentication and Authorization
- Admin Dashboard for System Management
- Movie CRUD Operations
- Seat Reservation System
- Show Time Management
- Booking History
- Payment Integration
- Email Notifications

## Technology Stack

- Node.js & Express.js
- MongoDB for Database
- JWT for Authentication
- Swagger for API Documentation
- Docker for Containerization

## Prerequisites

- Node.js
- npm (Node Package Manager)
- Docker (optional)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
4. Access the API documentation:
    - Open your browser and navigate to `http://localhost:3000/swag`
    - The Swagger UI will show all available API endpoints and their documentation

## API Endpoints

### User Management

- POST /api/auth/register - Register new user
- POST /api/auth/login - User login
- GET /api/users/profile - Get user profile

### Movie Management

- GET /api/movies - List all movies
- POST /api/movies - Add new movie (Admin)
- PUT /api/movies/:id - Update movie (Admin)
- DELETE /api/movies/:id - Delete movie (Admin)

### Reservation

- POST /api/reservations - Create reservation
- GET /api/reservations/:id - Get reservation details
- GET /api/reservations/user - Get user reservations

## Configuration

Create a `.env` file in the root directory:

## Clone the Repo
git clone https://github.com/ammarhere02/Movie-Reserve.git
