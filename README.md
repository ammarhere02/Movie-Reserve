# Movie Reserve Frontend

A modern, responsive React frontend for the Movie-Reserve backend system. This application provides a complete movie booking experience with user authentication, movie browsing, seat selection, and admin management capabilities.

## Features

### User Features
- **Authentication**: Secure login and registration with JWT tokens
- **Movie Browsing**: Browse movies with search and filter capabilities
- **Movie Details**: View detailed information about movies and available showtimes
- **Seat Booking**: Select seats and make reservations
- **Profile Management**: View profile information and booking history
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### Admin Features
- **Admin Dashboard**: Overview of system statistics
- **Movie Management**: Add, edit, and delete movies
- **User Management**: View and manage user accounts
- **Showtime Management**: Manage movie showtimes and schedules

## Technology Stack

- **React 18** - Modern React with hooks and functional components
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool and development server

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Movie-Reserve backend running on `http://localhost:3000`

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd movie-reserve-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Configuration

The application is configured to connect to the backend at `http://localhost:3000`. If your backend is running on a different port or host, update the `API_BASE_URL` in `src/services/api.js`.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Common/         # Common components (LoadingSpinner, ProtectedRoute)
│   ├── Layout/         # Layout components (Navbar, Layout)
│   └── Movies/         # Movie-specific components
├── contexts/           # React Context providers
├── pages/              # Page components
│   ├── Admin/          # Admin pages
│   ├── Auth/           # Authentication pages
│   ├── Booking/        # Booking pages
│   ├── Movies/         # Movie pages
│   └── Profile/        # Profile pages
├── services/           # API service functions
└── App.jsx            # Main application component
```

## API Integration

The frontend integrates with the following backend endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/admin/movies` - Create movie (Admin)
- `PATCH /api/admin/movies/:id` - Update movie (Admin)
- `DELETE /api/admin/movies/:id` - Delete movie (Admin)

### Users
- `GET /api/admin/users` - Get all users (Admin)
- `GET /api/admin/user/:id` - Get user by ID (Admin)

### Showtimes
- `GET /:movieId/showtime` - Get showtimes for a movie
- `POST /showtime` - Create showtime (Admin)

### Bookings
- `POST /booking` - Create booking
- `GET /:showtimeId/booking` - Get bookings for showtime

## Features in Detail

### Authentication System
- JWT token-based authentication
- Automatic token refresh handling
- Role-based access control (User/Admin)
- Protected routes with automatic redirects

### Movie Management
- Grid-based movie listing with search and filtering
- Detailed movie pages with showtime information
- Admin CRUD operations for movies
- Responsive movie cards with hover effects

### Booking System
- Interactive seat selection
- Real-time availability checking
- Booking confirmation with price calculation
- Payment integration placeholder

### Admin Dashboard
- System statistics overview
- Movie management interface
- User management capabilities
- Responsive admin interface

## Styling and Design

The application uses Tailwind CSS for styling with:
- Custom color palette based on primary blue theme
- Responsive design breakpoints
- Smooth animations and transitions
- Consistent spacing and typography
- Accessible color contrasts

## State Management

- React Context API for authentication state
- Local component state for UI interactions
- Centralized API error handling
- Toast notifications for user feedback

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Organization

- Components are organized by feature
- Reusable components in `components/Common/`
- API calls centralized in `services/api.js`
- Consistent naming conventions
- PropTypes for type checking (optional)

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting provider

3. Configure your web server to serve the React app and handle client-side routing

## API Documentation

The backend provides Swagger documentation at `http://localhost:3000/swag` when running locally.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.