import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { bookingsAPI } from '../../services/api';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import { User, Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Since we don't have a direct user bookings endpoint,
    // we'll show a placeholder for now
    setLoading(false);
  }, []);

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary-100 p-3 rounded-full">
                <User className="h-8 w-8 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                <p className="text-gray-600">Your account details</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="text-gray-900">{user?.email}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900 capitalize">{user?.role}</span>
                  {user?.role === 'admin' && (
                    <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium">
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking History */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <Ticket className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Booking History</h2>
                <p className="text-gray-600">Your recent movie reservations</p>
              </div>
            </div>

            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="space-y-4">
                {/* Placeholder for bookings */}
                <div className="text-center py-8">
                  <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="text-gray-500 text-lg mb-2">No bookings yet</div>
                  <p className="text-gray-400 text-sm">
                    Your movie reservations will appear here once you make a booking.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">0</div>
          <div className="text-gray-600">Total Bookings</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">0</div>
          <div className="text-gray-600">Movies Watched</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">$0</div>
          <div className="text-gray-600">Total Spent</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;