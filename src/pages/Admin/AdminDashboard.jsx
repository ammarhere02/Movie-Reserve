import React, { useState, useEffect } from 'react';
import { moviesAPI, usersAPI } from '../../services/api';
import MovieCard from '../../components/Movies/MovieCard';
import MovieForm from '../../components/Movies/MovieForm';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import { Plus, Users, Film, Calendar, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [moviesResponse, usersResponse] = await Promise.all([
        moviesAPI.getAll(),
        usersAPI.getAll().catch(() => ({ data: [] })) // Handle if users endpoint fails
      ]);
      
      setMovies(moviesResponse.data);
      setUsers(usersResponse.data || []);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMovie = async (movieData) => {
    setFormLoading(true);
    try {
      await moviesAPI.create(movieData);
      toast.success('Movie created successfully!');
      setShowMovieForm(false);
      fetchData();
    } catch (error) {
      toast.error('Failed to create movie');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateMovie = async (movieData) => {
    setFormLoading(true);
    try {
      await moviesAPI.update(editingMovie.id, movieData);
      toast.success('Movie updated successfully!');
      setEditingMovie(null);
      fetchData();
    } catch (error) {
      toast.error('Failed to update movie');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) {
      return;
    }

    try {
      await moviesAPI.delete(movieId);
      toast.success('Movie deleted successfully!');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete movie');
    }
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
        <p className="text-gray-600">Manage movies, users, and system settings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-3">
            <Film className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{movies.length}</div>
          <div className="text-gray-600">Total Movies</div>
        </div>
        
        <div className="card text-center">
          <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-3">
            <Users className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{users.length}</div>
          <div className="text-gray-600">Total Users</div>
        </div>
        
        <div className="card text-center">
          <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-3">
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
          <div className="text-gray-600">Active Showtimes</div>
        </div>
        
        <div className="card text-center">
          <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-3">
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
          <div className="text-gray-600">Total Bookings</div>
        </div>
      </div>

      {/* Movies Management */}
      <div className="card mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Movies Management</h2>
          <button
            onClick={() => setShowMovieForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Movie</span>
          </button>
        </div>

        {movies.length === 0 ? (
          <div className="text-center py-12">
            <Film className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500 text-lg mb-2">No movies yet</div>
            <p className="text-gray-400 text-sm">Add your first movie to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                showActions={true}
                onEdit={handleEditMovie}
                onDelete={handleDeleteMovie}
              />
            ))}
          </div>
        )}
      </div>

      {/* Movie Form Modal */}
      {(showMovieForm || editingMovie) && (
        <MovieForm
          movie={editingMovie}
          onSubmit={editingMovie ? handleUpdateMovie : handleCreateMovie}
          onCancel={() => {
            setShowMovieForm(false);
            setEditingMovie(null);
          }}
          loading={formLoading}
        />
      )}
    </div>
  );
};

export default AdminDashboard;