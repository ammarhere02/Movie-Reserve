import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Film, Calendar, Users, Star } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Film,
      title: 'Browse Movies',
      description: 'Discover the latest movies and find your next favorite film.',
      link: '/movies',
    },
    {
      icon: Calendar,
      title: 'Book Showtimes',
      description: 'Reserve your seats for upcoming showtimes.',
      link: '/movies',
    },
    {
      icon: Users,
      title: 'Manage Bookings',
      description: 'View and manage your reservation history.',
      link: '/profile',
    },
    {
      icon: Star,
      title: 'Premium Experience',
      description: 'Enjoy a seamless movie booking experience.',
      link: '/movies',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg p-8 mb-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to MovieReserve
          </h1>
          <p className="text-xl mb-6 text-primary-100">
            Your ultimate destination for movie reservations. Book tickets, choose your seats, 
            and enjoy the best cinema experience.
          </p>
          {user ? (
            <Link
              to="/movies"
              className="inline-block bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse Movies
            </Link>
          ) : (
            <div className="space-x-4">
              <Link
                to="/register"
                className="inline-block bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="inline-block border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {features.map((feature, index) => (
          <Link
            key={index}
            to={user ? feature.link : '/login'}
            className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <feature.icon className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Why Choose MovieReserve?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
            <div className="text-gray-600">Online Booking</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">100%</div>
            <div className="text-gray-600">Secure Payments</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">Fast</div>
            <div className="text-gray-600">Seat Selection</div>
          </div>
        </div>
      </div>

      {/* API Documentation Link */}
      <div className="mt-8 text-center">
        <a
          href="http://localhost:3000/swag"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:text-primary-800 text-sm underline"
        >
          View API Documentation (Swagger)
        </a>
      </div>
    </div>
  );
};

export default Home;