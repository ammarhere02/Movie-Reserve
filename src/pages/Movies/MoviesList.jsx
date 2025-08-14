import React, { useState, useEffect } from 'react';
import { moviesAPI } from '../../services/api';
import MovieCard from '../../components/Movies/MovieCard';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import { Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await moviesAPI.getAll();
      setMovies(response.data);
    } catch (error) {
      toast.error('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !selectedGenre || movie.genre.toLowerCase().includes(selectedGenre.toLowerCase());
    return matchesSearch && matchesGenre;
  });

  const genres = [...new Set(movies.map(movie => movie.genre))];

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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Movies</h1>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="input-field pl-10 pr-8 appearance-none bg-white"
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredMovies.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            {searchTerm || selectedGenre ? 'No movies found matching your criteria.' : 'No movies available.'}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesList;