import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';

const MovieCard = ({ movie, showActions = false, onEdit, onDelete }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{movie.name}</h3>
          <div className="flex items-center space-x-2 text-gray-600 mb-4">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{movie.genre}</span>
          </div>
          
          {movie.createdAt && (
            <div className="flex items-center space-x-2 text-gray-500 text-sm mb-4">
              <Calendar className="h-4 w-4" />
              <span>Added {new Date(movie.createdAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Link
            to={`/movies/${movie.id}`}
            className="btn-primary text-center"
          >
            View Details
          </Link>
          
          {showActions && (
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(movie)}
                className="btn-secondary flex-1"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(movie.id)}
                className="btn-danger flex-1"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;