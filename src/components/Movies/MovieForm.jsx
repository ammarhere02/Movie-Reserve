import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const MovieForm = ({ movie, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        name: movie.name || '',
        genre: movie.genre || '',
      });
    }
  }, [movie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {movie ? 'Edit Movie' : 'Add New Movie'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Movie Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex-1"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={loading}
            >
              {loading ? 'Saving...' : movie ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;