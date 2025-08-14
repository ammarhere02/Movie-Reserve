import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { moviesAPI, showtimesAPI } from '../../services/api';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import { ArrowLeft, Calendar, Clock, MapPin, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showtimesLoading, setShowtimesLoading] = useState(false);

  useEffect(() => {
    fetchMovieDetails();
    fetchShowtimes();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const response = await moviesAPI.getById(id);
      setMovie(response.data);
    } catch (error) {
      toast.error('Failed to fetch movie details');
      navigate('/movies');
    } finally {
      setLoading(false);
    }
  };

  const fetchShowtimes = async () => {
    setShowtimesLoading(true);
    try {
      const response = await showtimesAPI.getByMovie(id);
      setShowtimes(response.data || []);
    } catch (error) {
      // Showtimes might not exist, which is okay
      setShowtimes([]);
    } finally {
      setShowtimesLoading(false);
    }
  };

  const handleBookShowtime = (showtime) => {
    navigate(`/booking/${showtime.id}`, { 
      state: { movie, showtime } 
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">Movie not found.</div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <button
        onClick={() => navigate('/movies')}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Movies</span>
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{movie.name}</h1>
              
              <div className="flex items-center space-x-4 text-gray-600 mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>{movie.genre}</span>
                </div>
                {movie.createdAt && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Added {new Date(movie.createdAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Experience the magic of cinema with this {movie.genre.toLowerCase()} masterpiece. 
                  Book your tickets now and enjoy an unforgettable movie experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Showtimes Section */}
        <div className="border-t border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Showtimes</h2>
          
          {showtimesLoading ? (
            <LoadingSpinner />
          ) : showtimes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {showtimes.map(showtime => (
                <div key={showtime.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{showtime.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{showtime.seats} seats</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-600 mb-4">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">
                      {new Date(showtime.startTime).toLocaleTimeString()} - {new Date(showtime.endTime).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleBookShowtime(showtime)}
                    className="btn-primary w-full"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500">No showtimes available for this movie.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;