import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { bookingsAPI } from '../../services/api';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import { ArrowLeft, Calendar, Clock, MapPin, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

const BookingPage = () => {
  const { showtimeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, showtime } = location.state || {};
  
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!showtimeId) {
      toast.error('Invalid showtime');
      return;
    }

    setLoading(true);
    try {
      const bookingData = {
        showTimeId: parseInt(showtimeId),
        seats: selectedSeats,
        status: 'CONFIRMED'
      };

      await bookingsAPI.create(bookingData);
      toast.success('Booking confirmed successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  if (!movie || !showtime) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">Booking information not found.</div>
        <button
          onClick={() => navigate('/movies')}
          className="btn-primary mt-4"
        >
          Back to Movies
        </button>
      </div>
    );
  }

  const totalPrice = selectedSeats * 12; // $12 per seat

  return (
    <div className="animate-fade-in">
      <button
        onClick={() => navigate(`/movies/${movie.id}`)}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Movie Details</span>
      </button>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Book Your Tickets</h1>

        <div className="space-y-6">
          {/* Movie Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Movie Details</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Movie:</span>
                <span className="font-medium">{movie.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Genre:</span>
                <span className="font-medium">{movie.genre}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{showtime.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">
                  {new Date(showtime.startTime).toLocaleTimeString()} - {new Date(showtime.endTime).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Available Seats:</span>
                <span className="font-medium">{showtime.seats}</span>
              </div>
            </div>
          </div>

          {/* Seat Selection */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Seats</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="seats" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Seats
                </label>
                <select
                  id="seats"
                  value={selectedSeats}
                  onChange={(e) => setSelectedSeats(parseInt(e.target.value))}
                  className="input-field"
                >
                  {Array.from({ length: Math.min(showtime.seats, 10) }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>{num} seat{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Price Summary</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Seats ({selectedSeats}):</span>
                <span className="font-medium">${selectedSeats * 12}.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Service Fee:</span>
                <span className="font-medium">$2.00</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary-600">${totalPrice + 2}.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Payment</span>
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800 text-sm">
                <strong>Demo Mode:</strong> This is a demonstration. No actual payment will be processed.
              </p>
            </div>
            
            <button
              onClick={handleBooking}
              disabled={loading}
              className="btn-primary w-full text-lg py-3"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <LoadingSpinner size="sm" />
                  <span>Processing...</span>
                </div>
              ) : (
                `Confirm Booking - $${totalPrice + 2}.00`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;